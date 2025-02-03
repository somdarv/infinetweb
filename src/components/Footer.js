'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import ButtonSecondary from './ButtonSecondary';





export default function Footer({ page }) {

    const router = useRouter();

    const menuItems = [
        { id: 1, label: 'Home', path: '/' },
        { id: 2, label: 'About', path: '/about' },
        { id: 4, label: 'Products', path: '/products' },
    ]

    const [activeItem, setActiveItem] = useState(page);

    const handleNavigation = (item) => {
        setActiveItem(item.label);
        router.push(item.path);
    };


    return (
        <div className='w-full bg-primary py-20'>

            {/* Top */}
            <div className='w-[90%] bo gap-y-8 py-8 flex container-section md:w-[80%] mx-auto'>

                < h1 className='text-white font-bold text-4xl md:text-[46px] leading-none' >
                    Download The < br /> Freedom App
                </h1 >

                <div className='flex gap-x-4'>
                    <ButtonSecondary label={'Android Application'} />
                    <ButtonSecondary label={'iOS Application'} />
                </div>
            </div >

            <div className='w-[90%]  gap-y-8 py-8 md:w-[80%] mx-auto text-white container-section-start'>
                {/* far left */}
                <div className=''>
                    <button>
                        <Image
                            src="/images/infinetlogo.svg"
                            alt='infinet logo'
                            width={120}
                            height={200}
                        />
                    </button>
                    <p className='text-sm w-full md:w-[40%] my-2'>
                        Infinet brings together seamless payments and instant access in one sleek package. Think of us as your digital key to the city.
                    </p>
                </div>

                {/* right side */}
                <div className='flex items-start gap-x-20'>
                    <div>
                        <p className='text-accent font-semibold mb-4'>Support</p>
                        <div className='flex flex-col items-start'>
                            <button className='my-2'>
                                Documentation
                            </button>
                            <button className='my-2'>
                                Contact
                            </button>
                        </div>
                    </div>


                    <div>
                        <p className='text-accent font-semibold mb-4'>Company</p>
                        <div className='flex flex-col items-start'>
                            <button className='my-2'>
                                How It Works                            </button>
                            <button className='my-2'>
                                About Us
                            </button>
                            <button className='my-2'>
                                Features
                            </button>
                        </div>
                    </div>


                    <div>
                        <p className='text-accent font-semibold mb-4'>Legal</p>
                        <div className='flex flex-col items-start'>
                            <button className='my-2'>
                                Privacy
                            </button>
                            <button className='my-2'>
                                Terms
                            </button>
                            <button className='my-2'>
                                Partners
                            </button>
                        </div>
                    </div>


                </div>


            </div>

            <p className='text-white pb-8 w-[90%] md:w-[80%] mx-auto font-light text-sm'>© 2025 Infinet. All rights reserved.</p>



        </div >
    )
}
