'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="bg-black/80 backdrop-blur-sm rounded-full p-1 shadow-lg">
        <div className="flex relative">
          {/* Анимированный фон для активного элемента */}
          <motion.div
            className="absolute top-0 bottom-0 bg-gray-300 rounded-full"
            initial={false}
            animate={{
              left: language === 'ru' ? 0 : '50%',
              width: '50%'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          
          {/* Кнопка РУС */}
          <button
            onClick={() => language !== 'ru' && toggleLanguage()}
            className={`relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
              language === 'ru' 
                ? 'text-black' 
                : 'text-white/70 hover:text-white'
            }`}
          >
            РУС
          </button>
          
          {/* Кнопка ҚАЗ */}
          <button
            onClick={() => language !== 'kz' && toggleLanguage()}
            className={`relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
              language === 'kz' 
                ? 'text-black' 
                : 'text-white/70 hover:text-white'
            }`}
          >
            ҚАЗ
          </button>
        </div>
      </div>
    </motion.div>
  )
} 