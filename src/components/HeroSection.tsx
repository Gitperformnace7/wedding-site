'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const scrollToDetails = () => {
    const detailsSection = document.getElementById('details')
    if (detailsSection) {
      detailsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative w-full overflow-hidden mobile-full-height">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Ваше свадебное фото */}
        <img 
          src="/images/wedding-photo.jpg" 
          alt="Рустем и Фариза" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center text-white h-full flex flex-col justify-between py-16"
        >
          {/* Дата вверху - ЗДЕСЬ МОЖНО НАСТРОИТЬ ОТСТУП СВЕРХУ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pt-2 md:pt-10" // Увеличил отступ сверху
          >
            <h1 className="font-serif text-2xl md:text-4xl font-light tracking-wider text-shadow drop-shadow-lg text-white elegant-date">
              12 | 09 | 2025
            </h1>
          </motion.div>

          {/* Wedding Day - ЗДЕСЬ НАСТРОЙКА ЦЕНТРАЛЬНОГО БЛОКА */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0 }}
            className="flex-1 flex flex-col justify-start pt-16 md:pt-20"
          >
            <h2 className="font-serif text-5xl md:text-7xl mb-2 text-shadow drop-shadow-lg italic text-white">
              Wedding Day
            </h2>
            
          </motion.div>

          {/* Имена внизу - Каллиграфический стиль */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="pb-16 md:pb-16" // Отступ снизу
          >
            <div className="text-center">
              <h3 className="font-script text-5xl md:text-7xl text-white text-shadow drop-shadow-xl mb-3 font-normal leading-none elegant-script">
                Рустем
              </h3>
              <div className="flex items-center justify-center my-6">
                <div className="h-px bg-white/40 w-10 md:w-16"></div>
                <span className="font-serif text-3xl md:text-4xl text-white mx-6 opacity-80 font-light">&</span>
                <div className="h-px bg-white/40 w-10 md:w-16"></div>
              </div>
              <h3 className="font-script text-5xl md:text-7xl text-white text-shadow drop-shadow-xl font-normal leading-none elegant-script">
                Фариза
              </h3>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.0 }}
          onClick={scrollToDetails}
          className="absolute bottom-8 md:bottom-8 left-1/1 transform -translate-x-1/2 text-white hover:text-wedding-gold transition-colors duration-300 safe-bottom"
        >
          <ChevronDown className="w-8 h-8 md:w-8 md:h-8 animate-bounce" />
        </motion.button>
      </div>
    </section>
  )
} 