'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, UserCheck, UserX, Calendar, MessageSquare, Eye, EyeOff } from 'lucide-react'

interface RSVPResponse {
  id: number
  name: string
  attendance: 'yes' | 'no'
  message: string | null
  created_at: string
}

interface RSVPSummary {
  total: number
  attending: number
  notAttending: number
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [responses, setResponses] = useState<RSVPResponse[]>([])
  const [summary, setSummary] = useState<RSVPSummary | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'wedding2025') {
      setIsAuthenticated(true)
      setError('')
      fetchRSVPData()
    } else {
      setError('Неверный пароль')
    }
  }

  const fetchRSVPData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/rsvp?admin=wedding2025')
      const data = await response.json()
      
      if (response.ok) {
        setResponses(data.responses)
        setSummary(data.summary)
      } else {
        setError(data.error || 'Ошибка при загрузке данных')
      }
    } catch (err) {
      setError('Ошибка при загрузке данных')
      console.error('Error fetching RSVP data:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-wedding-gray flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl text-wedding-black mb-2">
              Админ панель
            </h1>
            <p className="font-modern text-wedding-gray-dark">
              Управление RSVP ответами
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block font-modern text-wedding-black mb-2">
                Пароль
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-gold focus:border-transparent outline-none transition-colors pr-12"
                  placeholder="Введите пароль"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-wedding-gray-dark hover:text-wedding-black"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-wedding-gold hover:bg-wedding-gold/90 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Войти
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-wedding-gray">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="font-serif text-2xl text-wedding-black">
              Админ панель - RSVP ответы
            </h1>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-wedding-gray-dark hover:text-wedding-black"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wedding-gold mx-auto mb-4"></div>
            <p className="font-modern text-wedding-gray-dark">Загрузка данных...</p>
          </div>
        ) : (
          <>
            {/* Статистика */}
            {summary && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <div className="flex items-center">
                    <Users className="w-8 h-8 text-wedding-gold mr-3" />
                    <div>
                      <p className="font-modern text-sm text-wedding-gray-dark">Всего ответов</p>
                      <p className="font-serif text-2xl text-wedding-black">{summary.total}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <div className="flex items-center">
                    <UserCheck className="w-8 h-8 text-green-600 mr-3" />
                    <div>
                      <p className="font-modern text-sm text-wedding-gray-dark">Придут</p>
                      <p className="font-serif text-2xl text-wedding-black">{summary.attending}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <div className="flex items-center">
                    <UserX className="w-8 h-8 text-red-600 mr-3" />
                    <div>
                      <p className="font-modern text-sm text-wedding-gray-dark">Не придут</p>
                      <p className="font-serif text-2xl text-wedding-black">{summary.notAttending}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Список ответов */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="font-serif text-xl text-wedding-black">
                  Все ответы ({responses.length})
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-wedding-gray">
                    <tr>
                      <th className="text-left px-6 py-3 font-modern text-wedding-black">Имя</th>
                      <th className="text-left px-6 py-3 font-modern text-wedding-black">Присутствие</th>
                      <th className="text-left px-6 py-3 font-modern text-wedding-black">Дата ответа</th>
                      <th className="text-left px-6 py-3 font-modern text-wedding-black">Сообщение</th>
                    </tr>
                  </thead>
                  <tbody>
                    {responses.map((response, index) => (
                      <tr key={response.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 font-medium text-wedding-black">
                          {response.name}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            response.attendance === 'yes' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {response.attendance === 'yes' ? 'Придет' : 'Не придет'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-wedding-gray-dark">
                          {formatDate(response.created_at)}
                        </td>
                        <td className="px-6 py-4 text-wedding-gray-dark">
                          {response.message ? (
                            <div className="flex items-start">
                              <MessageSquare className="w-4 h-4 text-wedding-gold mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{response.message}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">Нет сообщения</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {responses.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-wedding-gold mx-auto mb-4 opacity-50" />
                  <p className="font-modern text-wedding-gray-dark">
                    Пока нет ответов
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
} 