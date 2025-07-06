import { NextRequest, NextResponse } from 'next/server'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// Инициализация базы данных
async function initDB() {
  const db = await open({
    filename: './wedding_rsvp.db',
    driver: sqlite3.Database
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS rsvp_responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      attendance TEXT NOT NULL,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  return db
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

    // Сохранение в базе данных
    const db = await initDB()
    const result = await db.run(
      'INSERT INTO rsvp_responses (name, attendance, message) VALUES (?, ?, ?)',
      [name, attendance, message || null]
    )

    await db.close()

    return NextResponse.json({
      success: true,
      id: result.lastID,
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

    const db = await initDB()
    const responses = await db.all(`
      SELECT * FROM rsvp_responses 
      ORDER BY created_at DESC
    `)

    await db.close()

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