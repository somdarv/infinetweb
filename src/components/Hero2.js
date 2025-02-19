import Image from 'next/image'
import React from 'react'
import ButtonPrimary from './ButtonPrimary'
import ButtonSecondary from './ButtonSecondary'
import { Clock, CreditCard, Globe, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import CardServices from './CardServices'





export default function Hero2() {
    const FeatureTag = ({ children }) => (
        <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white/90 flex items-center gap-2">
            {children}
        </div>
    );
    return (
        <div className='w-full bg-red- min-h-screen'>
            <div className='w-full   flex flex-wrap items-center justify-between py-20'>
                <div className='w-full md:w-[50%] relative'>
                    {/* <motion.div
                    className="absolute left-0 top-0 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Clock className="w-4 h-4 text-blue-300" />
                    <span className="text-sm text-white">Setup in 2 minutes</span>
                </motion.div> */}
                    <Image
                        src={'/images/vccards.png'}
                        width={1080}
                        height={1080}
                        className='w-[80%] mx-auto'
                        alt='Infinet-Virtual-Cards' />

                </div>



                <div className='w-full md:w-[50%] '>
                    <h1 className="font-hogira text-white text-3xl mb-2">Infinet</h1>
                    <h1 className="font-erstoria text-white text-7xl">Virtual Cards</h1>
                    <p className='text-white w-[70%] text-lg my-8'>Your digital world deserves better cards. Shop, stream, and subscribe instantly with virtual cards that work everywhere. No hassle, just freedom.</p>


                    <div className="flex flex-wrap gap-3 mb-8">
                        <FeatureTag>
                            <Globe className="w-4 h-4" />
                            Global Acceptance
                        </FeatureTag>
                        <FeatureTag>
                            <Zap className="w-4 h-4" />
                            Instant Setup
                        </FeatureTag>
                        <FeatureTag>
                            <CreditCard className="w-4 h-4" />
                            Zero Fees
                        </FeatureTag>
                    </div>


                    <div className='flex items-center gap-x-3'>
                        <ButtonPrimary label={'Get A Card'} />
                        <ButtonSecondary label={'Learn More'} />
                    </div>




                </div>





            </div>

            <div className='w-full'>
                <CardServices />
            </div>
        </div>
    )
}
