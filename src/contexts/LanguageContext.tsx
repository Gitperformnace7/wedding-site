'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'kz' | 'ru'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Типы для переводов
type TranslationKey = 'hero.date' | 'hero.wedding-day' | 'hero.groom' | 'hero.bride' | 
  'details.title' | 'details.subtitle' | 'details.month' | 'details.year' | 'details.date' | 
  'details.time' | 'details.countdown' | 'details.days' | 'details.hours' | 'details.minutes' | 
  'details.seconds' | 'details.venue' | 'rsvp.title' | 'rsvp.subtitle' | 'rsvp.name-label' | 
  'rsvp.name-placeholder' | 'rsvp.name-required' | 'rsvp.attendance-label' | 'rsvp.attendance-yes' | 
  'rsvp.attendance-no' | 'rsvp.attendance-required' | 'rsvp.message-label' | 'rsvp.message-placeholder' | 
  'rsvp.submit' | 'rsvp.submitting' | 'rsvp.success-yes' | 'rsvp.success-no' | 'rsvp.success-message-yes' | 
  'rsvp.success-message-no' | 'rsvp.add-to-calendar' | 'rsvp.calendar-subtitle' | 'rsvp.calendar-button' | 
  'rsvp.calendar-info' | 'rsvp.error' | 'map.title' | 'map.subtitle' | 'map.venue-name' | 'map.address' | 
  'map.address-note' | 'map.directions' | 'footer.thanks' | 'footer.created' | 'footer.copyright' | 
  'footer.date-time' | 'calendar.mon' | 'calendar.tue' | 'calendar.wed' | 'calendar.thu' | 'calendar.fri' | 
  'calendar.sat' | 'calendar.sun' | 'language.kz' | 'language.ru'

type TranslationRecord = Record<TranslationKey, string>

// Переводы
const translations: Record<Language, TranslationRecord> = {
  kz: {
    // HeroSection - НЕ ПЕРЕВОДИМ (по просьбе пользователя)
    'hero.date': '12 | 09 | 2025',
    'hero.wedding-day': 'Wedding Day',
    'hero.groom': 'Рустем',
    'hero.bride': 'Фариза',
    
    // DetailsSection
    'details.title': 'Құрметті қонақтар!',
    'details.subtitle': 'Біз үшін ерекше болған оқиғаның қуанышын бізбен бөлісуге және біздің отбасылық тарихымыздың бір бөлігі болуға шақырамыз.',
    'details.month': 'Қыркүйек',
    'details.year': '2025',
    'details.date': '12 қыркүйек 2025',
    'details.time': '18:00',
    'details.countdown': 'Тойға дейін қалған:',
    'details.days': 'күн',
    'details.hours': 'сағат',
    'details.minutes': 'минут',
    'details.seconds': 'секунд',
    'details.venue': 'Portofino Grand Ballroom мейрамханасы',
    
    // RSVPSection
    'rsvp.title': 'Қатысуды растау',
    'rsvp.subtitle': 'Өтінеміз, қатысуыңызды растаңыз',
    'rsvp.name-label': 'Сіздің тегіңіз бен атыңыз *',
    'rsvp.name-placeholder': 'Тегіңіз бен атыңызды енгізіңіз',
    'rsvp.name-required': 'Өтінеміз, тегіңіз бен атыңызды көрсетіңіз',
    'rsvp.attendance-label': 'Той салтанатына қатыса аласыз ба? *',
    'rsvp.attendance-yes': 'Иә, қуанышпен келемін! 🎉',
    'rsvp.attendance-no': 'Өкінішке орай, қатыса алмаймын 😢',
    'rsvp.attendance-required': 'Өтінеміз, нұсқалардың бірін таңдаңыз',
    'rsvp.message-label': 'Тілектер немесе пікірлер',
    'rsvp.message-placeholder': 'Жас жұбайларға тілектеріңіз (міндетті емес)',
    'rsvp.submit': 'Жауапты жіберу',
    'rsvp.submitting': 'Жіберілуде...',
    'rsvp.success-yes': 'Рахмет!',
    'rsvp.success-no': 'Түсінеміз!',
    'rsvp.success-message-yes': 'Жауабыңыз алынды. Біз сізбен кездесуді асыға күтеміз!',
    'rsvp.success-message-no': 'Жауабыңыз алынды. Сіз біздің салтанатымызға қатыса алмайтыныңыз өте өкінішті.',
    'rsvp.add-to-calendar': 'Күнтізбеге қосу',
    'rsvp.calendar-subtitle': 'Біздің той күнін сақтауды ұмытпаңыз!',
    'rsvp.calendar-button': 'Күнтізбеге қосу',
    'rsvp.calendar-info': '12 қыркүйек 2025, 18:00 • Portofino Grand Ballroom мейрамханасы',
    'rsvp.error': 'Жауапты жіберуде қате орын алды. Өтінеміз, қайтадан көріңіз.',
    
    // MapSection
    'map.title': 'Қалай жету',
    'map.subtitle': 'Біз сіздерге арнап, салтанатымыз үшін тамаша жер таңдадық',
    'map.venue-name': 'Portofino Grand Ballroom мейрамханасы',
    'map.address': 'Астана қ., Portofino Grand Ballroom мейрамханасы',
    'map.address-note': 'Нақты мекенжайды төмендегі батырма арқылы 2ГИС-те көруге болады',
    'map.directions': '2ГИС-те ашу',
    
    // Footer
    'footer.thanks': 'Біздің ерекше күнімізге қатысқаныңыз үшін рахмет!',
    'footer.created': 'Қымбатты достарымыз бен отбасымыз үшін сүйіспеншілікпен жасалған',
    'footer.copyright': '© 2025',
    'footer.date-time': '12 қыркүйек 2025 • 18:00',
    
    // Calendar days
    'calendar.mon': 'ДС',
    'calendar.tue': 'СС',
    'calendar.wed': 'СР',
    'calendar.thu': 'БС',
    'calendar.fri': 'ЖМ',
    'calendar.sat': 'СН',
    'calendar.sun': 'ЖК',
    
    // Language switcher
    'language.kz': 'Қазақша',
    'language.ru': 'Русский',
  },
  ru: {
    // HeroSection - НЕ ПЕРЕВОДИМ (по просьбе пользователя)
    'hero.date': '12 | 09 | 2025',
    'hero.wedding-day': 'Wedding Day',
    'hero.groom': 'Рустем',
    'hero.bride': 'Фариза',
    
    // DetailsSection
    'details.title': 'Дорогие гости!',
    'details.subtitle': 'Приглашаем вас разделить с нами радость особенного для нас события и стать частью нашей семейной истории.',
    'details.month': 'Сентябрь',
    'details.year': '2025',
    'details.date': '12 сентября 2025',
    'details.time': '18:00',
    'details.countdown': 'До свадьбы осталось:',
    'details.days': 'дней',
    'details.hours': 'часов',
    'details.minutes': 'минут',
    'details.seconds': 'секунд',
    'details.venue': 'Ресторан Portofino Grand Ballroom',
    
    // RSVPSection
    'rsvp.title': 'Подтверждение присутствия',
    'rsvp.subtitle': 'Пожалуйста, подтвердите ваше присутствие',
    'rsvp.name-label': 'Ваша фамилия и имя *',
    'rsvp.name-placeholder': 'Введите вашу фамилию и имя',
    'rsvp.name-required': 'Пожалуйста, укажите вашу фамилию и имя',
    'rsvp.attendance-label': 'Сможете ли вы присутствовать на торжестве? *',
    'rsvp.attendance-yes': 'Да, с удовольствием приду! 🎉',
    'rsvp.attendance-no': 'К сожалению, не смогу присутствовать 😢',
    'rsvp.attendance-required': 'Пожалуйста, выберите один из вариантов',
    'rsvp.message-label': 'Пожелания или комментарии',
    'rsvp.message-placeholder': 'Ваши пожелания молодоженам (необязательно)',
    'rsvp.submit': 'Отправить ответ',
    'rsvp.submitting': 'Отправляется...',
    'rsvp.success-yes': 'Спасибо!',
    'rsvp.success-no': 'Понимаем вас!',
    'rsvp.success-message-yes': 'Ваш ответ получен. Мы с нетерпением ждем встречи с вами!',
    'rsvp.success-message-no': 'Ваш ответ получен. Очень жаль, что вы не сможете присутствовать на нашем торжестве.',
    'rsvp.add-to-calendar': 'Добавить в календарь',
    'rsvp.calendar-subtitle': 'Не забудьте сохранить дату нашей свадьбы!',
    'rsvp.calendar-button': 'Добавить в календарь',
    'rsvp.calendar-info': '12 сентября 2025, 18:00 • Ресторан Portofino Grand Ballroom',
    'rsvp.error': 'Произошла ошибка при отправке ответа. Пожалуйста, попробуйте еще раз.',
    
    // MapSection
    'map.title': 'Как добраться',
    'map.subtitle': 'Мы выбрали для вас прекрасное место для нашего торжества',
    'map.venue-name': 'Ресторан Portofino Grand Ballroom',
    'map.address': 'г. Астана, Ресторан Portofino Grand Ballroom',
    'map.address-note': 'Точный адрес можно посмотреть в 2ГИС по кнопке ниже',
    'map.directions': 'Открыть в 2ГИС',
    
    // Footer
    'footer.thanks': 'Спасибо, что станете частью нашего особенного дня!',
    'footer.created': 'С любовью создано для наших дорогих друзей и семьи',
    'footer.copyright': '© 2025',
    'footer.date-time': '12 сентября 2025 • 18:00',
    
    // Calendar days
    'calendar.mon': 'ПН',
    'calendar.tue': 'ВТ',
    'calendar.wed': 'СР',
    'calendar.thu': 'ЧТ',
    'calendar.fri': 'ПТ',
    'calendar.sat': 'СБ',
    'calendar.sun': 'ВС',
    
    // Language switcher
    'language.kz': 'Қазақша',
    'language.ru': 'Русский',
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ru')

  // Загружаем сохраненный язык при первом рендере
  useEffect(() => {
    const savedLanguage = localStorage.getItem('wedding-language') as Language
    if (savedLanguage && (savedLanguage === 'kz' || savedLanguage === 'ru')) {
      setLanguage(savedLanguage)
    } else {
      // Если нет сохраненного языка или он некорректный, устанавливаем русский
      setLanguage('ru')
      localStorage.setItem('wedding-language', 'ru')
    }
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === 'ru' ? 'kz' : 'ru'
    setLanguage(newLanguage)
    localStorage.setItem('wedding-language', newLanguage)
  }

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 
