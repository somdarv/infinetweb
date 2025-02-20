'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import ButtonSecondary from './ButtonSecondary';
import { Facebook, Instagram, Linkedin, TicketIcon, Twitter, X } from 'lucide-react';
import JoinEmailForm from './JoinEmailForm';





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
        <div className='w-full bg-primary py-8'>

            {/* Top */}
            <div className='w-[90%] bo gap-y-8 py-8 flex container-section md:w-[80%] mx-auto'>

                <div>
                    < h1 className='text-white font-bold text-3xl md:text-[36px] leading-none' >
                        Download The < br /> Freedom App
                    </h1 >

                    <div className='w- my-6 flex items-center gap-x-2'>
                        <button>
                            <Image
                                alt='apple'
                                src={'/images/apple.svg'}
                                width={100}
                                height={100}
                            />
                        </button>
                        <button>
                            <Image
                                alt='android'
                                src={'/images/android.svg'}
                                width={100}
                                height={100}
                            />
                        </button>
                    </div>
                </div>

                <div className='flex w-[60%]  gap-x-4'>
                    <div>


                        {/* <div className='flex items-center text-white text-xl gap-x-2 my-8 justify-end'>
                            <Facebook className='cursor-pointer' />
                            <Instagram className='cursor-pointer' />
                            <Linkedin className='cursor-pointer' />
                            <Twitter className='cursor-pointer' />
                        </div> */}
                    </div>


                    <div className='flex w-full justify-end'>
                        <div className='w-full flex flex-col items-end justify-end'>
                            <h1 className='text-xl my-2 text-end text-[#D66BA0]'>Be Part of What&apos;s Next</h1>
                            <p className='text-white text-end w-full  md:w-[80%] 2xl:w-[65%] text-sm my-2'>Subscribe to get exclusive insights, early access to new features, and special offers delivered straight to your inbox. Join thousands of forward-thinking professionals already on board.</p>
                            <div className='w-[60%] flex justify-end '>
                                <JoinEmailForm className='my-4 flex justify-end ' />
                            </div>
                        </div>
                    </div>

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
                    <p className='text-sm w-full md:w-[45%] my-2'>
                        Infinet brings together seamless payments and instant access in one sleek package. Think of us as your digital key to the city.
                    </p>
                </div>

                {/* right side */}
                <div className='flex items-start gap-x-20'>
                    <div className='text-sm'>
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


                    <div className='text-sm'>
                        <p className='text-accent font-semibold mb-4'>Browse</p>
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


                    <div className='text-sm'>
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
