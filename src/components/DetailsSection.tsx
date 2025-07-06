'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function DetailsSection() {
  // Таймер обратного отсчета
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const weddingDate = new Date('2025-09-12T18:00:00')
    
    const updateTimer = () => {
      const now = new Date()
      const difference = weddingDate.getTime() - now.getTime()
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)
        
        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }
    
    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    
    return () => clearInterval(interval)
  }, [])

  // Генерируем календарь для сентября 2025
  const generateCalendar = () => {
    const daysInMonth = 30 // сентябрь имеет 30 дней
    const firstDay = new Date(2025, 8, 1).getDay() // 0 = воскресенье, 1 = понедельник, etc.
    const startDay = firstDay === 0 ? 6 : firstDay - 1 // Преобразуем в понедельник = 0
    
    const calendar = []
    const daysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
    
    // Добавляем заголовки дней недели
    calendar.push(
      <div key="header" className="grid grid-cols-7 gap-1 mb-4">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center text-sm font-russian font-medium text-wedding-gray-dark py-2">
            {day}
          </div>
        ))}
      </div>
    )
    
    // Создаем календарную сетку
    const weeks = []
    let currentWeek = []
    
    // Добавляем пустые клетки для начала месяца
    for (let i = 0; i < startDay; i++) {
      currentWeek.push(
        <div key={`empty-${i}`} className="aspect-square"></div>
      )
    }
    
    // Добавляем дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const isWeddingDay = day === 12
      
      currentWeek.push(
        <div key={day} className="aspect-square flex items-center justify-center relative">
          {isWeddingDay ? (
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              className="w-full h-full bg-wedding-gold rounded-full flex items-center justify-center relative"
            >
              <Heart className="absolute inset-0 w-full h-full text-white opacity-20" />
              <span className="text-white font-bold text-lg relative z-10">{day}</span>
            </motion.div>
          ) : (
            <span className="text-wedding-gray-dark font-medium">{day}</span>
          )}
        </div>
      )
      
      // Если неделя закончилась, добавляем её в массив недель
      if (currentWeek.length === 7) {
        weeks.push(
          <div key={`week-${weeks.length}`} className="grid grid-cols-7 gap-1 mb-2">
            {currentWeek}
          </div>
        )
        currentWeek = []
      }
    }
    
    // Добавляем последнюю неделю, если она не пустая
    if (currentWeek.length > 0) {
      // Заполняем оставшиеся дни пустыми клетками
      while (currentWeek.length < 7) {
        currentWeek.push(
          <div key={`empty-end-${currentWeek.length}`} className="aspect-square"></div>
        )
      }
      weeks.push(
        <div key={`week-${weeks.length}`} className="grid grid-cols-7 gap-1 mb-2">
          {currentWeek}
        </div>
      )
    }
    
    calendar.push(...weeks)
    return calendar
  }

  return (
    <section id="details" className="py-20 px-6 bg-wedding-cream">
      <div className="max-w-2xl mx-auto">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
                     <h2 className="font-script text-5xl md:text-5xl text-wedding-black mb-8 elegant-title-shadow">
             Дорогие гости!
           </h2>
                     <p className="font-russian text-base md:text-lg text-wedding-gray-dark leading-relaxed max-w-lg mx-auto">
             Приглашаем вас разделить с нами радость особенного для нас события и стать частью нашей семейной истории.
           </p>
        </motion.div>

        {/* Декоративная линия */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "100%" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="h-px bg-wedding-gold mb-16 mx-auto max-w-xs"
        ></motion.div>

        {/* Календарь */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-sm p-8 mx-auto max-w-md"
        >
          {/* Название месяца */}
          <div className="text-center mb-8">
                         <h3 className="font-script text-3xl md:text-4xl text-wedding-black mb-2 month-title-shadow">
               Сентябрь
             </h3>
          </div>

          {/* Календарная сетка */}
          <div className="calendar-grid">
            {generateCalendar()}
          </div>

          {/* Год */}
          <div className="text-center mt-8">
            <span className="font-elegant text-2xl font-light text-wedding-gray-dark">
              2025
            </span>
          </div>
        </motion.div>

        {/* Дополнительная информация */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="max-w-sm mx-auto">
            {/* Декоративная верхняя линия */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-px bg-wedding-gold"></div>
              <Heart className="w-3 h-3 text-wedding-gold mx-4" />
              <div className="w-12 h-px bg-wedding-gold"></div>
            </div>
            
                                      {/* Дата и время */}
             <div className="mb-8">
               <p className="font-serif text-2xl font-light text-wedding-black mb-3 tracking-wide">
                 12 сентября 2025
               </p>
               <p className="font-serif text-3xl font-normal text-wedding-black tracking-widest">
                 18:00
               </p>
             </div>
             
             {/* Таймер обратного отсчета */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               viewport={{ once: true }}
               className="mb-8"
             >
               <p className="font-russian text-sm text-wedding-gray-dark mb-4 uppercase tracking-wide">
                 До свадьбы осталось:
               </p>
               <div className="grid grid-cols-4 gap-4">
                 <div className="text-center">
                   <div className="bg-wedding-gold-light rounded-lg p-3 mb-2">
                     <span className="font-elegant text-2xl font-bold text-wedding-black">
                       {timeLeft.days}
                     </span>
                   </div>
                   <span className="font-russian text-xs text-wedding-gray-dark uppercase">
                     дней
                   </span>
                 </div>
                 <div className="text-center">
                   <div className="bg-wedding-gold-light rounded-lg p-3 mb-2">
                     <span className="font-elegant text-2xl font-bold text-wedding-black">
                       {timeLeft.hours}
                     </span>
                   </div>
                   <span className="font-russian text-xs text-wedding-gray-dark uppercase">
                     часов
                   </span>
                 </div>
                 <div className="text-center">
                   <div className="bg-wedding-gold-light rounded-lg p-3 mb-2">
                     <span className="font-elegant text-2xl font-bold text-wedding-black">
                       {timeLeft.minutes}
                     </span>
                   </div>
                   <span className="font-russian text-xs text-wedding-gray-dark uppercase">
                     минут
                   </span>
                 </div>
                 <div className="text-center">
                   <div className="bg-wedding-gold-light rounded-lg p-3 mb-2">
                     <span className="font-elegant text-2xl font-bold text-wedding-black">
                       {timeLeft.seconds}
                     </span>
                   </div>
                   <span className="font-russian text-xs text-wedding-gray-dark uppercase">
                     секунд
                   </span>
                 </div>
               </div>
             </motion.div>
             
             {/* Декоративная средняя линия */}
             <div className="flex items-center justify-center mb-6">
               <div className="w-8 h-px bg-wedding-gold opacity-50"></div>
               <div className="w-1 h-1 bg-wedding-gold rounded-full mx-3"></div>
               <div className="w-8 h-px bg-wedding-gold opacity-50"></div>
             </div>
            
            {/* Место */}
            <div className="mb-8">
              <p className="font-russian text-lg text-wedding-black italic">
                Ресторан Portafino
              </p>
            </div>
            
            {/* Декоративная нижняя линия */}
            <div className="flex items-center justify-center">
              <div className="w-6 h-px bg-wedding-gold opacity-30"></div>
              <div className="w-1 h-1 bg-wedding-gold rounded-full mx-2 opacity-50"></div>
              <div className="w-6 h-px bg-wedding-gold opacity-30"></div>
            </div>
          </div>
        </motion.div>

       
      </div>
    </section>
  )
} 