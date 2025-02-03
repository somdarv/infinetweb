import Image from 'next/image'
import React from 'react'


export default function OurPartners() {
    return (
        <div className='container-componen bg-primary rounded-3xl py-8 '>
            <div className='w-[80%] mx-auto'>
                <div className='container-section flex items-center  mx-auto'>
                    <div className='w-[]'>
                        <p className='text-accent my-2 text-lg font-semibold'>Partners</p>
                        <h1 className='text-white font-semibold text-4xl'>Our Trusted Partners</h1>
                    </div>

                    <div className='w-[70%] flex items-center gap-x-12'>
                        <div className=' justify-center border-white w-32 flex items-center rounded-lg'>
                            <Image
                                src={'/images/lvs.png'}
                                width={200}
                                height={200}
                                alt='lvs logo'
                            />
                        </div>
                        <div className=' justify-center border-white w-32 flex items-center rounded-lg'>
                            <Image
                                src={'/images/farko.png'}
                                width={200}
                                height={200}
                                alt='lvs logo'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
