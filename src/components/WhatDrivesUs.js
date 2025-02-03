'use client'


import React from 'react'
// import { TbDotsDiagonal } from "react-icons/tb";
import { TbDotsDiagonal, TbCircle, TbHandClick, TbUsersGroup } from "react-icons/tb";




export default function WhatDrivesUs() {
    const CardData = [
        {
            icon: TbDotsDiagonal,
            title: 'Simplicity',
            subText: "Making payments second nature. Simple, intuitive transactions without the complexity."
        },
        {
            icon: TbCircle,
            title: 'Convenience',
            subText: "Seamless payments at your fingertips. No barriers, just smooth transactions for everyone."
        },
        {
            icon: TbHandClick,
            title: 'Ease of Use',
            subText: "A friendly interface that just works. Making every payment effortless and enjoyable."
        },
        {
            icon: TbUsersGroup,
            title: 'Inclusion',
            subText: "Bridging payment methods old and new. Financial solutions that work for all of Africa."
        }
    ]
    return (
        <div className='bg-gray-200 '>
            <div className='w-[90%] md:w-[80%] z-10 mx-auto text-white h- py-20'>

                <div className='text-center md:text-left mb-8'> {/* Added container for heading and subtext */}
                    <p className='text-[#D66BA0] font-semibold text-lg'>Our Core Values</p>

                    <h1 className='text-primary font-bold text-[40px] md:text-[32px] leading-tight mb-2'>
                        What Drives Us
                    </h1>
                    <p className='text-primary w-full font-semibold md:w-[40%]'>
                        {"                        Our core values shape everything we do, from product design to customer service"}
                    </p>
                </div>

                <div className='w-full flex flex-wrap justify-center items-center'>
                    <div className='my-12 w-full md:w-[78%] gap-y-4 flex flex-wrap justify-between'>



                        {CardData.map((card, index) => {
                            const Icon = card.icon;
                            return (
                                <div key={index} className='w-full  md:w-[48%] bg-primary py-12 px- text-white rounded-3xl'>
                                    <div className='flex flex-wrap justify-between w-[80%] mx-auto'>
                                        <div className='h-16 w-16 bg-gray-200 rounded-xl flex justify-center items-center'>
                                            <Icon className='text-primary text-4xl font-semibold' />
                                        </div>
                                        <div className='w-[70%]'>
                                            <h1 className='font-bold text-xl mb-2'>{card.title}</h1>
                                            <p className='text-sm'>{card.subText}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}









                    </div>
                </div>
            </div>
        </div>
    )
}
