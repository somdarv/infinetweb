'use client'
import React, { useState, useRef, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Navigation from '../components/Navigation'
import Image from 'next/image'
import Hero from '@/components/Hero'
import OurPartners from '@/components/OurPartners'
import AboutBrief from '@/components/AboutBrief'
import HowItWorks from '@/components/HowItWorks'
import Footer from '@/components/Footer'



export default function Page() {
  return (
    <div className='bg-primary-dark z-50 overflow-none relative flex flex-col justify-between min-h-screen '>

      <span className='absolute z-50 w-[30%] pointer-events-none'>
        <Image
          src={'/images/topleftlight.svg'}
          width={200}
          height={200}
          className='w-full mix-blend-multiply'
          alt='lightimage'
        />
      </span>
      <div className='flex justify-end w-full'>
        {/* <span className='absolute z-50 w-[50%] pointer-events-none transform translate-y-200 flex justify-end'>
          <Image
            src={'/images/rightlight.png'}
            width={200}
            height={200}
            className='w-full flex justify-end'
            alt='lightimage'
          />
        </span> */}
      </div>
      {/* <span className='absolute z-50 w-[40%] pointer-events-none transform translate-y-96 flex justify-start'>
        <Image
          src={'/images/bottomleftlight.png'}
          width={200}
          height={200}
          className='w-full flex justify-start'
          alt='lightimage'
        />
      </span> */}

      <Navigation page={'Home'} className='-z-10' />

      <div className='w-[80%] bg-primary-dark mx-auto'>
        <Hero />
      </div>

      <div>
        <Footer page={'Home'} />
      </div>

    </div>
  )
}

