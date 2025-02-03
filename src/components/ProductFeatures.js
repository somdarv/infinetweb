import Image from 'next/image'
import React from 'react'


export default function ProductFeatures() {
    const FeatureData = [
        {
            title: "Tap-To-Pay",
            subText: "Transform everyday transactions with instant payments. Simple taps replace complex codes, making commerce effortless for everyone.",
            image: "/images/right-arrow.svg"
        },
        {
            title: "Works Offline",
            subText: "Stay connected to your money even when offline. Complete transactions seamlessly without worrying about network coverage.",
            image: "/images/right-arrow.svg"
        },
        {
            title: "VIP Event Access",
            subText: "Skip the lines and enjoy premium access to exclusive events. Your ticket to elevated experiences is always in your pocket.",
            image: "/images/right-arrow.svg"
        },
        {
            title: "Admin Dashboard",
            subText: "Take control of your business Manage transactions and growth in one place  with real-time insights and powerful analytics.",
            image: "/images/right-arrow.svg"
        }
    ];


    return (
        <div className='w-[90%] my-4 md:w-[80%] mx-auto container-section'>
            <div className='w-full'>
                <div className='text-center md:text-left mb-8'> {/* Added container for heading and subtext */}
                    <p className='text-[#D66BA0] font-semibold text-lg'>What You get</p>

                    <h1 className='text-primary font-bold text-[40px] md:text-[32px] leading-tight mb-2'>
                        Product Features
                    </h1>
                    <p className='text-primary w-full font-semibold md:w-[100%]'>
                        {" Our Core Features; top of the line"}
                    </p>
                </div>


                <div className='flex flex-wrap items-center justify-between'>

                    {FeatureData.map((feature, index) => (
                        <div key={index} className='rounded-3xl group cursor-pointer hover:bg-opacity-95 flex flex-col justify-between p-8 w-full md:w-[23%] bg-primary text-white'>
                            <h1 className='font-bold text-2xl my-6'>
                                {feature.title}
                            </h1>

                            <Image
                                src={feature.image}
                                width={230}
                                height={230}
                                className='w-8 my-16 group-hover:ml-4 ease-in-out duration-300 transition-all'
                            />

                            <p className='text-xs text-white'>{feature.subText}</p>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}
