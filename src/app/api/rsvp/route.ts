import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function POST(request: NextRequest) {
  try {
    const { name, attendance, message } = await request.json()

    // Валидация данных
    if (!name || !attendance) {
      return NextResponse.json(
        { error: 'Имя и подтверждение присутствия обязательны' },
        { status: 400 }
      )
    }

    if (attendance !== 'yes' && attendance !== 'no') {
      return NextResponse.json(
        { error: 'Неверное значение для подтверждения присутствия' },
        { status: 400 }
      )
    }

    // Создание записи
    const response = {
      id: Date.now().toString(),
      name,
      attendance,
      message: message || null,
      created_at: new Date().toISOString()
    }

    // Сохранение в Vercel KV
    await kv.hset(`rsvp:${response.id}`, response)
    
    // Добавление ID в список для получения всех ответов
    await kv.sadd('rsvp:ids', response.id)

    return NextResponse.json({
      success: true,
      id: response.id,
      message: 'RSVP ответ сохранен успешно'
    })
  } catch (error) {
    console.error('Error saving RSVP:', error)
    return NextResponse.json(
      { error: 'Ошибка при сохранении ответа' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Простая аутентификация для админ панели
    const { searchParams } = new URL(request.url)
    const adminKey = searchParams.get('admin')
    
    if (adminKey !== 'wedding2025') {
      return NextResponse.json(
        { error: 'Доступ запрещен' },
        { status: 403 }
      )
    }

    // Получение всех ID ответов
    const responseIds = await kv.smembers('rsvp:ids')
    
    // Получение всех ответов
    const responses: any[] = []
    for (const id of responseIds) {
      const response = await kv.hgetall(`rsvp:${id}`)
      if (response && response.name) {
        responses.push({
          id: response.id,
          name: response.name,
          attendance: response.attendance,
          message: response.message,
          created_at: response.created_at
        })
      }
    }

    // Сортировка по дате создания (новые первыми)
    responses.sort((a, b) => new Date(b.created_at as string).getTime() - new Date(a.created_at as string).getTime())

    return NextResponse.json({
      responses,
      summary: {
        total: responses.length,
        attending: responses.filter(r => r.attendance === 'yes').length,
        notAttending: responses.filter(r => r.attendance === 'no').length
      }
    })
  } catch (error) {
    console.error('Error fetching RSVP responses:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении ответов' },
      { status: 500 }
    )
  }
} 