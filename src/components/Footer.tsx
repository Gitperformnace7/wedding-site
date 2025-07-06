'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Calendar } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="bg-wedding-black text-wedding-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-wedding-gold animate-float" />
          </div>
          
          <h3 className="font-script text-4xl mb-4 text-shadow">
            {t('hero.groom')} & {t('hero.bride')}
          </h3>
          
          <div className="flex items-center justify-center mb-6">
            <Calendar className="w-5 h-5 text-wedding-gold mr-2" />
            <span className="font-modern text-wedding-gold">
              {t('footer.date-time')}
            </span>
          </div>
          
          <p className="font-russian text-lg mb-6 text-wedding-white/80">
            {t('footer.thanks')}
          </p>
          
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-wedding-gold w-16"></div>
            <Heart className="w-4 h-4 mx-4 text-wedding-gold" />
            <div className="h-px bg-wedding-gold w-16"></div>
          </div>
          
          <div className="text-sm text-wedding-white/60">
            <p className="mb-2 font-russian">
              {t('footer.created')}
            </p>
            <p>
              {t('footer.copyright')} <span className="font-script">{t('hero.groom')} & {t('hero.bride')}</span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
} 