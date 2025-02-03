import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'
import MissionVision from '@/components/MissionVission'
import Navigation from '@/components/Navigation'
import WhatDrivesUs from '@/components/WhatDrivesUs'
import React from 'react'



export default function page() {
    return (
        <div className=' bg-about  overflow-none relative  min-h-scree '>

            <div className='.content z-'>
                <Navigation page={'About'} />
            </div>

            <div className='w-full  h-screen '>
                <AboutSection />
            </div>

            <div className='white'>
                <WhatDrivesUs />
            </div>

            <div className='w-full bg-primary'>
                <MissionVision />
            </div>

            <div>
                <Footer />
            </div>
        </div>
    )
}
