'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Music, Heart } from 'lucide-react'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3 // Устанавливаем тихую громкость
    }
  }, [])

  const togglePlay = async () => {
    if (!audioRef.current) return
    
    setHasInteracted(true)
    setShowHint(false)
    
    try {
      if (isPlaying) {
        await audioRef.current.pause()
        setIsPlaying(false)
      } else {
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error('Ошибка воспроизведения аудио:', error)
    }
  }

  const handleCanPlay = () => {
    setIsLoaded(true)
    console.log('Аудио загружено')
  }

  const handleEnded = () => {
    setIsPlaying(false)
    // Можем зациклить музыку
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  // Автоплей при первом взаимодействии с пользователем
  useEffect(() => {
    const handleFirstInteraction = async () => {
      if (!hasInteracted && audioRef.current && isLoaded) {
        console.log('Первое взаимодействие - пытаемся включить музыку')
        try {
          await audioRef.current.play()
          setIsPlaying(true)
          setHasInteracted(true)
          setShowHint(false)
          console.log('Автоплей успешен')
        } catch (error) {
          console.error('Автоплей заблокирован:', error)
          setShowHint(true) // Показываем подсказку если автоплей не сработал
        }
      }
    }

    // Слушаем первое взаимодействие пользователя - добавляем больше событий
    const events = ['click', 'touchstart', 'touchend', 'keydown', 'scroll', 'mousemove']
    events.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { once: true, passive: true })
    })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction)
      })
    }
  }, [hasInteracted, isLoaded])

  // Скрыть подсказку через 10 секунд
  useEffect(() => {
    if (showHint) {
      const timer = setTimeout(() => {
        setShowHint(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showHint])

  return (
    <>
      {/* Скрытый аудио элемент */}
      <audio
        ref={audioRef}
        preload="auto"
        onCanPlay={handleCanPlay}
        onEnded={handleEnded}
        loop
      >
        <source src="/audio/wedding-music.mp3" type="audio/mpeg" />
        <source src="/audio/wedding-music.ogg" type="audio/ogg" />
        {/* Fallback для случая, если файлы не найдены */}
        <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav" />
      </audio>

      {/* Плавающая кнопка управления музыкой */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed bottom-6 left-6 z-50"
      >
        <div className="relative">
          {/* Анимированные кольца при воспроизведении */}
          <AnimatePresence>
            {isPlaying && (
              <>
                <motion.div
                  key="ring1"
                  animate={{ 
                    scale: [0.8, 1.8, 0.8], 
                    opacity: [0.6, 0, 0.6] 
                  }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gray-400 rounded-full"
                />
                <motion.div
                  key="ring2"
                  animate={{ 
                    scale: [0.8, 1.4, 0.8], 
                    opacity: [0.4, 0, 0.4] 
                  }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: 0.6,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gray-400 rounded-full"
                />
              </>
            )}
          </AnimatePresence>

          {/* Основная кнопка */}
          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-14 h-14 bg-transparent hover:bg-gray-400/20 text-gray-400 border-2 border-gray-400 rounded-full shadow-lg flex items-center justify-center transition-colors duration-300"
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="volume-on"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Volume2 className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="volume-off"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <VolumeX className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Подсказка */}
        <AnimatePresence>
          {showHint && !hasInteracted && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute left-16 top-1/2 -translate-y-1/2 bg-black/80 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap"
            >
              <div className="flex items-center">
                <Music className="w-4 h-4 mr-2" />
                Коснитесь экрана для музыки
              </div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-black/80"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      
    </>
  )
} 