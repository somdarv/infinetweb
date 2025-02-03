'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import {
    motion,
    useTransform,
    AnimatePresence,
    useMotionValue,
    useSpring,
} from "framer-motion";



export default function SocialProof() {
    const people = [
        {
            id: 1,
            name: "Sobur",
            designation: "Software Engineer",
            src: '/images/p1.svg'
        },
        {
            id: 2,
            name: "Lawrencia",
            designation: "Seamstress",
            src: '/images/p3.svg'
        },
        {
            id: 4,
            name: "Woawolo",
            designation: "Graphic Designer",
            src: '/images/woawolo.png'
        },
        {
            id: 3,
            name: "Jules",
            designation: "Researcher",
            src: '/images/p2.svg'
        },

    ]
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // const [hoveredIndex, setHoveredIndex] = useState < number | null > (null);

    const springConfig = { stiffness: 100, damping: 5 };

    const x = useMotionValue(0); // going to set this value on mouse move


    // rotate the tooltip
    const rotate = useSpring(
        useTransform(x, [-100, 100], [-45, 45]),
        springConfig
    );

    // translate the tooltip
    const translateX = useSpring(
        useTransform(x, [-100, 100], [-50, 50]),
        springConfig
    );

    const handleMouseMove = (event, any) => {
        const halfWidth = event.target.offsetWidth / 2;
        x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
    };

    return (
        <div className='w-full flex items-center justify-center md:justify-start  gap-x-3 '>
            {people.map((testimonial, idx) => (
                <div
                    className="-mr-10  relative group"
                    key={testimonial.name}
                    onMouseEnter={() => setHoveredIndex(testimonial.id)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence mode="wait">
                        {hoveredIndex === testimonial.id && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 10,
                                    },
                                }}
                                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                style={{
                                    translateX: translateX,
                                    rotate: rotate,
                                    whiteSpace: "nowrap",
                                }}
                                className="absolute -mr-4 -top-16 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-primary z-50 shadow-xl px-4 py-2"
                            >
                                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                                <div className="font-bold text-white relative z-30 text-base">
                                    {testimonial.name}
                                </div>
                                <div className="text-white text-xs">
                                    {testimonial.designation}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <Image
                        onMouseMove={handleMouseMove}
                        height={100}
                        width={100}
                        src={testimonial.src}
                        alt={testimonial.name}
                        className="object-cover !m-0 !p-0 object-top rounded-full md:h-12 md:w-12 h-10 w-10 border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500"
                    />
                </div>
            ))}

            <div className='flex ml-8 items-center gap-x-2 '>
                <h1 className='text-accent text-4xl font-bold'>12.4k</h1>
                <p className='text-white fon text-xs w-full sm:text-[12px]'>Eager users across <br /> the the country</p>
            </div>

        </div>
    )
}
