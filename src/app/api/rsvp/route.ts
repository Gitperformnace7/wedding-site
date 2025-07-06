import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'redis'

// Создание Redis клиента
const getRedisClient = async () => {
  const client = createClient({
    url: process.env.REDIS_URL
  })
  
  await client.connect()
  return client
}

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

    // Подключение к Redis
    const redis = await getRedisClient()
    
    try {
      // Сохранение в Redis (каждое поле отдельно)
      await redis.hSet(`rsvp:${response.id}`, {
        'id': response.id,
        'name': response.name,
        'attendance': response.attendance,
        'message': response.message || '',
        'created_at': response.created_at
      })
      
      // Добавление ID в список для получения всех ответов
      await redis.sAdd('rsvp:ids', response.id)
    } finally {
      // Закрытие соединения
      await redis.quit()
    }

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

    // Подключение к Redis
    const redis = await getRedisClient()

    try {
      // Получение всех ID ответов
      const responseIds = await redis.sMembers('rsvp:ids')
      
      // Получение всех ответов
      const responses: any[] = []
      for (const id of responseIds) {
        const response = await redis.hGetAll(`rsvp:${id}`)
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
    } finally {
      // Закрытие соединения
      await redis.quit()
    }
  } catch (error) {
    console.error('Error fetching RSVP responses:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении ответов' },
      { status: 500 }
    )
  }
} 