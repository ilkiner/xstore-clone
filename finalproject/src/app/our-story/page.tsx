'use client'

import React from 'react'
import AboutIntro from './AboutIntro'
import ServicesSection from './ServicesSection'
import AboutSection from './AboutSection'
import StatsSection from './StatsSection'
import PrioritySection from './PrioritySection'


const OurStoryPage = () => {
  return (
    <div className='min-h-screen py-10 px-4'>
     <AboutIntro />
        <ServicesSection />
        <AboutSection />
        <StatsSection />
        <PrioritySection />
    </div>
  )
}

export default OurStoryPage;
