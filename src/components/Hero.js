'use client'

import React from 'react'
import ButtonSecondary from './ButtonSecondary'
import ButtonPrimary from './ButtonPrimary'
import SocialProof from './SocialProof'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Router, useRouter } from 'next/navigation';



export default function Hero() {
    const HeroGroups = [
        {}
    ]

    const router = useRouter();
    return (
        <div className='container-component py-20 '>
            <div className='container-section '>


                {/* left Side */}
                <div className='z-50 bg-blue w-full md:w-[45%] '>
                    <motion.div
                        className='z-50 bg-blue w-full '
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >

                        <motion.h1
                            className='text-white font-bold md:hidden text-center md:text-left text-[40px] md:text-[56px] leading-tight'
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        >Skip The Queue, Just Tap Through
                        </motion.h1>

                        <motion.h1
                            className='text-white font-bold hidden md:flex text-center md:text-left text-[44px] md:text-[56px] leading-tight'
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        >
                            Skip The Queue, <br /> Just Tap Through
                        </motion.h1>
                        <p className='text-white text-sm text-center md:text-left my-4'>
                            {/* {"No more tickets, no more waiting. Just effortless entry to the club or the show! One tap gets you through the door while others wait in line. Whether it's an exclusive club night or sold-out concert, you're always on the VIP list."} */}
                            {"No lines, no waiting, no delays—just a seamless way through, every single time. Move effortlessly, skip the hold-ups, and step into a world where everything flows. One simple tap, and you're exactly where you need to be, without the unnecessary stops."}
                        </p>

                        <div className='flex mt-8 items-center justify-center md:justify-start gap-x-4'>
                            <ButtonPrimary label={'Get Your Card'} onClick={() => router.push('https://infinetwallet.com/access/customer/')} />
                            <ButtonSecondary label={'Partner With Us'} />
                        </div>

                        <div className='mt-8 md:mt-16  ml-'>
                            <SocialProof />
                        </div>



                    </motion.div>

                    {/* <h1 className='text-white font-bold text-[56px] leading-tight'>Skip The Queue, <br /> Just Tap Through</h1>
                    <p className='text-white text-sm  my-8'>
                        {"No more tickets, no more waiting. Just effortless entry to the club or the show! One tap gets you through the door while others wait in line. Whether it's an exclusive club night or sold-out concert, you're always on the VIP list."}

                    </p>
                    <div className='flex items-center  gap-x-4'>
                        <ButtonPrimary label={'Get Your Card'} />
                        <ButtonSecondary label={'Partner With Us'} />
                    </div>


                    <div className='mt-16 ml-8'>
                        <SocialProof />
                    </div> */}

                </div>

                {/* right side */}
                <motion.div className='w-full mt-8 md:mt-0 md:w-[54%]'
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}>
                    <Image
                        src={'/images/cardscene.svg'}
                        width={200}
                        height={200}
                        className='w-full'
                        alt='card scene'


                    />
                </motion.div>

            </div>
        </div>
    )
}
