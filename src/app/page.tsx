'use client'

import React from 'react'
import HeroSection from '@/components/HeroSection'
import DetailsSection from '@/components/DetailsSection'
import MapSection from '@/components/MapSection'
import RSVPSection from '@/components/RSVPSection'
import Footer from '@/components/Footer'
import MusicPlayer from '@/components/MusicPlayer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <DetailsSection />
      <MapSection />
      <RSVPSection />
      <Footer />
      <MusicPlayer />
    </main>
  )
} 