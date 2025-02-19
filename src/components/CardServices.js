import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';




export default function CardServices() {

    const LogoScroll = () => {
        const [scrollPosition, setScrollPosition] = useState(0);

        useEffect(() => {
            const animation = setInterval(() => {
                setScrollPosition(prev => (prev - 1) % 100);
            }, 50);

            return () => clearInterval(animation);
        }, []);


    }

    const companies = [
        { src: '/images/companylogos/netflix.png', alt: "Netflix" },
        { src: '/images/companylogos/spotify.png', alt: "spotify" },
        { src: '/images/companylogos/amazon.png', alt: "amazon" },
        { src: '/images/companylogos/apple.png', alt: "apple" },
        { src: '/images/companylogos/google.png', alt: "google" },
        { src: '/images/companylogos/microsoft.png', alt: "microsoft" },
        { src: '/images/companylogos/steam.png', alt: "steam" },
        { src: '/images/companylogos/adobe.png', alt: "adobe" },
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 w-full overflow-hidden bg-whit backdrop-blur-sm py-6 rounded-xl"
        >
            <div className="mb-3 text-center">
                <span className="text-white/70 text-sm">Works with your favorite services</span>
            </div>

            <div className="relative flex justify-center items-center">
                {/* First row of logos */}
                <div
                    className="flex gap-12 items-center animate-scroll px-8"
                    style={{
                        minWidth: '100%',
                        animation: 'scroll 30s linear infinite'
                    }}
                >
                    {/* Replace placeholder images with actual service logos */}



                    {companies.map((company, index) => (
                        <div key={`first-${index}`} className="flex items-center justify-center w-[100px]">
                            <Image
                                width={100}
                                height={100}
                                src={company.src}
                                alt={company.alt}
                                className="w-full h-auto opacity-70 hover:opacity-100 transition-opacity"
                            />
                        </div>
                    ))}


                </div>

                {/* Duplicate row for seamless scrolling */}
                <div
                    className="flex gap-12 items-center animate-scroll px-8 absolute left-full"
                    style={{
                        minWidth: '100%',
                        animation: 'scroll 30s linear infinite'
                    }}
                >
                    {/* Duplicate logos for continuous scroll */}
                    {companies.map((company, index) => (
                        <div key={`second-${index}`} className="flex items-center justify-center w-[100px]">
                            <Image
                                width={70}
                                height={70}
                                src={company.src}
                                alt={company.alt}
                                className="w-full h-auto  hover:opacity-100 transition-opacity"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
