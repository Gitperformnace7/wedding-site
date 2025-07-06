'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation, Phone, Heart } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function MapSection() {
  const { t } = useLanguage()
  
  const handleDirections = () => {
    // Ссылка на 2ГИС для ресторана Portofino
    // Заменить на реальный адрес когда будет известен
    const address = 'Ресторан Portofino'
    const url = 'https://2gis.kz/astana/geo/70000001022291208'
    window.open(url, '_blank')
  }

  return (
    <section className="py-20 px-6 bg-wedding-gray">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-wedding-black mb-4">
            {t('map.title')}
          </h2>
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-wedding-gold w-16"></div>
            <Heart className="w-4 h-4 mx-4 text-wedding-gold" />
            <div className="h-px bg-wedding-gold w-16"></div>
          </div>
          <p className="font-elegant text-lg text-wedding-gray-dark max-w-2xl mx-auto">
            {t('map.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Информация о месте */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-sm p-8"
          >
            <div className="flex items-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-wedding-gold-light rounded-full mr-4">
                <MapPin className="w-6 h-6 text-wedding-gold" />
              </div>
              <h3 className="font-serif text-xl text-wedding-black">
                {t('map.venue-name')}
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-wedding-gold mr-3 mt-0.5" />
                <div>
                  <p className="font-modern text-wedding-gray-dark">
                    {t('map.address')}
                  </p>
                  <p className="font-modern text-sm text-wedding-gray-dark opacity-75">
                    {t('map.address-note')}
                  </p>
                </div>
              </div>
              
              
            </div>

            <button
              onClick={handleDirections}
              className="mt-8 w-full bg-wedding-gold hover:bg-wedding-gold/90 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              <Navigation className="w-5 h-5 mr-2" />
              {t('map.directions')}
            </button>
          </motion.div>

          {/* Карта placeholder 
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="h-80 bg-gradient-to-br from-wedding-gold-light to-wedding-gray flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-wedding-gold mx-auto mb-4" />
                <p className="font-modern text-wedding-gray-dark">
                  Интерактивная карта
                </p>
                <p className="font-modern text-sm text-wedding-gray-dark opacity-75">
                  Будет добавлена после уточнения адреса
                </p>
              </div>
            </div>
          </motion.div>*/}
        </div>

        {/* Дополнительная информация 
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 bg-white rounded-lg p-8 text-center"
        >
          <h3 className="font-serif text-xl text-wedding-black mb-4">
            Парковка и транспорт
          </h3>
          <p className="font-modern text-wedding-gray-dark">
            Подробная информация о парковке и доступном транспорте будет предоставлена позже. 
            Мы позаботимся о том, чтобы ваше прибытие было комфортным.
          </p>
        </motion.div>*/}
      </div>
    </section>
  )
} 