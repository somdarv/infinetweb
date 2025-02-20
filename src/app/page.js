'use client'
import React, { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import Navigation from '../components/Navigation'
import Image from 'next/image'
import Hero from '@/components/Hero'
import OurPartners from '@/components/OurPartners'
import AboutBrief from '@/components/AboutBrief'
import HowItWorks from '@/components/HowItWorks'
import Footer from '@/components/Footer'
import Hero2 from '@/components/Hero2'



export default function Page() {
  const [heroType, setHeroType] = useState(2)
  const [isAnimating, setIsAnimating] = useState(false);



  const heroConfigs = {
    1: {
      background: 'bg-primary-dark',
      text: 'text-white',
      position: 'left-0',
      image: '/images/bottomleftlight.png'
    },
    2: {
      background: 'hero2bg',
      text: 'text-gray-800',
      position: 'right-0',
      image: '/images/hero2-image.png'
    },
    // 3: {
    //   background: 'bg-accent',
    //   text: 'text-white',
    //   position: 'center',
    //   image: '/images/hero3-image.png'
    // }
  };



  // Auto-switching logic
  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setHeroType((current) =>
          current === Object.keys(heroConfigs).length ? 1 : current + 1
        );
        setIsAnimating(false);
      }, 500); // Match this with your animation duration
    }, 10000); // Change hero every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const currentConfig = heroConfigs[heroType];

  const renderHero = () => {
    switch (heroType) {
      case 1:
        return <Hero />;
      case 2:
        return <Hero2 />;
      default:
        return <Hero />;
    }
  };


  return (
    <div className={`${currentConfig.background}  ${currentConfig.text} 'bg-primary-dark z-50 overflow-none relative flex flex-col justify-between min-h-screen '`}>
      <div className='bg-black/25 w-full h-full'>
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

        <Navigation page={'Home'} className='-z-10 my-4' />

        {/* <div className='w-[80%] bg-primary-dark mx-auto'>
        <Hero2 />
      </div> */}
        <div className='w-[80%] min-h-screen mx-auto'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={heroType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {renderHero()}
            </motion.div>
          </AnimatePresence>
        </div>


        <div>
          <Footer page={'Home'} />
        </div>


      </div>
    </div>
  )
}

