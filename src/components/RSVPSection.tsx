'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Heart, Send, CheckCircle, Calendar, Download, HeartHandshake } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface RSVPFormData {
  name: string
  attendance: 'yes' | 'no'
  message?: string
}

export default function RSVPSection() {
  const { t } = useLanguage()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userAttendance, setUserAttendance] = useState<'yes' | 'no' | null>(null)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RSVPFormData>()

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true)
    
    try {
      // Отправка данных на сервер
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setUserAttendance(data.attendance)
        reset()
      } else {
        throw new Error('Failed to submit RSVP')
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error)
      alert(t('rsvp.error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  // Функция для создания ICS файла (iPhone/iOS)
  const createICSFile = () => {
    const event = {
      title: t('hero.groom') + ' & ' + t('hero.bride') + ' Wedding',
      start: '20250912T150000Z', // 18:00 по Астане = 15:00 UTC
      end: '20250913T000000Z',   // До полуночи
      location: t('details.venue') + ', Астана',
      description: t('hero.groom') + ' & ' + t('hero.bride') + ' Wedding'
    }

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding//Wedding Calendar//EN
BEGIN:VEVENT
UID:${Date.now()}@wedding-rustem-fariza.com
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'wedding-rustem-fariza.ics'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Функция для создания Google Calendar URL (Android)
  const createGoogleCalendarURL = () => {
    const event = {
      text: t('hero.groom') + ' & ' + t('hero.bride') + ' Wedding',
      dates: '20250912T150000Z/20250913T000000Z',
      location: t('details.venue') + ', Астана',
      details: t('hero.groom') + ' & ' + t('hero.bride') + ' Wedding'
    }

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&dates=${event.dates}&location=${encodeURIComponent(event.location)}&details=${encodeURIComponent(event.details)}`
    
    window.open(url, '_blank')
  }

  // Функция для определения устройства и выбора подходящего календаря
  const addToCalendar = () => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isIOS = /iphone|ipad|ipod/.test(userAgent)
    const isAndroid = /android/.test(userAgent)

    if (isIOS) {
      // Для iOS используем ICS файл
      createICSFile()
    } else if (isAndroid) {
      // Для Android используем Google Calendar
      createGoogleCalendarURL()
    } else {
      // Для десктопа показываем выбор
      const choice = confirm('Выберите способ добавления:\nОК - Google Calendar\nОтмена - Скачать ICS файл')
      if (choice) {
        createGoogleCalendarURL()
      } else {
        createICSFile()
      }
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-20 px-6 bg-wedding-white">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {userAttendance === 'yes' ? (
              <CheckCircle className="w-16 h-16 text-wedding-gold mx-auto mb-6" />
            ) : (
              <HeartHandshake className="w-16 h-16 text-wedding-gold mx-auto mb-6" />
            )}
            <h2 className="font-script text-3xl text-wedding-black mb-4 elegant-title-shadow">
              {userAttendance === 'yes' ? t('rsvp.success-yes') : t('rsvp.success-no')}
            </h2>
            <p className="font-russian text-lg text-wedding-gray-dark mb-8">
              {userAttendance === 'yes' 
                ? t('rsvp.success-message-yes')
                : t('rsvp.success-message-no')
              }
            </p>
            
            {userAttendance === 'yes' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-lg shadow-lg p-6 mt-8"
              >
                <Calendar className="w-8 h-8 text-wedding-gold mx-auto mb-4" />
                <h3 className="font-script text-xl text-wedding-black mb-2 elegant-title-shadow">
                  {t('rsvp.add-to-calendar')}
                </h3>
                <p className="font-russian text-sm text-wedding-gray-dark mb-4">
                  {t('rsvp.calendar-subtitle')}
                </p>
                <button
                  onClick={addToCalendar}
                  className="bg-wedding-gold hover:bg-wedding-gold/90 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center mx-auto"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t('rsvp.calendar-button')}
                </button>
                <p className="font-russian text-xs text-wedding-gray-dark mt-3">
                  {t('rsvp.calendar-info')}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="py-20 px-6 bg-wedding-white">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-script text-4xl md:text-4xl text-wedding-black mb-4 elegant-title-shadow">
            {t('rsvp.title')}
          </h2>
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-wedding-gold w-16"></div>
            <Heart className="w-4 h-4 mx-4 text-wedding-gold" />
            <div className="h-px bg-wedding-gold w-16"></div>
          </div>
          <p className="font-russian text-lg text-wedding-gray-dark">
            {t('rsvp.subtitle')}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-lg shadow-lg p-8 space-y-6"
        >
          {/* Имя */}
          <div>
            <label className="block font-russian text-wedding-black mb-2">
              {t('rsvp.name-label')}
            </label>
            <input
              type="text"
              {...register('name', { required: t('rsvp.name-required') })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-gold focus:border-transparent outline-none transition-colors"
              placeholder={t('rsvp.name-placeholder')}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Подтверждение присутствия */}
          <div>
            <label className="block font-modern text-wedding-black mb-4">
              {t('rsvp.attendance-label')}
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="yes"
                  {...register('attendance', { required: t('rsvp.attendance-required') })}
                  className="w-4 h-4 text-wedding-gold focus:ring-wedding-gold border-gray-300"
                />
                <span className="ml-3 font-modern text-wedding-black">
                  {t('rsvp.attendance-yes')}
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="no"
                  {...register('attendance', { required: t('rsvp.attendance-required') })}
                  className="w-4 h-4 text-wedding-gold focus:ring-wedding-gold border-gray-300"
                />
                <span className="ml-3 font-modern text-wedding-black">
                  {t('rsvp.attendance-no')}
                </span>
              </label>
            </div>
            {errors.attendance && (
              <p className="mt-1 text-sm text-red-600">{errors.attendance.message}</p>
            )}
          </div>

          {/* Пожелания */}
          <div>
            <label className="block font-russian text-wedding-black mb-2">
              {t('rsvp.message-label')}
            </label>
            <textarea
              {...register('message')}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-gold focus:border-transparent outline-none transition-colors resize-none"
              placeholder={t('rsvp.message-placeholder')}
            />
          </div>

          {/* Кнопка отправки */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-wedding-gold hover:bg-wedding-gold/90 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {t('rsvp.submitting')}
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                {t('rsvp.submit')}
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  )
} 