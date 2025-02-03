import Image from 'next/image'
import React from 'react'


export default function MissionVision() {
    return (
        <div className='w-[90%] md:w-[90%] border-b lg:w-[80%] mx-auto text-white py-24'>
            <div className='flex items-center flex-wrap w-full gap-y-24 justify-between '>

                <div className='w-full md:w-[45%] flex flex-wrap items-center justify-between'>
                    <Image
                        src={'/images/purpose.svg'}
                        width={70}
                        height={70}
                        alt=''
                        className='w-[30%] md:w-[20%] mx-auto'
                    />

                    <div className='w-full md:w-[74%]'>
                        <h1 className='monument-regular font-bold text-center md:text-left my-2 text-2xl'>Our Purpose</h1>
                        <p className='text-sm text-center md:text-left'>To create a payment experience where ease and simplicity reign supreme, making transactions feel like second nature through an instant, effortless process.</p>
                    </div>
                </div>

                <div className='w-full md:w-[45%] flex flex-wrap items-center justify-between'>
                    <Image
                        src={'/images/prospect.svg'}
                        width={70}
                        height={70}
                        alt=''
                        className='w-[30%] md:w-[20%] mx-auto'
                    />

                    <div className='w-full md:w-[74%]'>
                        <h1 className='monument-regular font-bold text-center md:text-left my-2 text-2xl'>Our Prospect</h1>
                        <p className='text-sm text-center md:text-left'>To create a payment experience where ease and simplicity reign supreme, making transactions feel like second nature through an instant, effortless process.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
