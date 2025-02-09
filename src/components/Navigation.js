
'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import ButtonSecondary from './ButtonSecondary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faHamburger } from '@fortawesome/free-solid-svg-icons';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdBusinessCenter } from "react-icons/md";
import { Router, useRouter } from 'next/navigation';




export default function Navigation({ page }) {
    const router = useRouter();

    const menuItems = [
        { id: 1, label: 'Home', path: '/' },
        { id: 2, label: 'About', path: '/about' },
        { id: 3, label: 'Product', path: '/product' },
        { id: 4, label: 'Blog', path: '/blog' },
        { id: 5, label: 'Contact', path: '/' },
    ]

    const [activeItem, setActiveItem] = useState(page);


    const handleNavigation = (item) => {
        setActiveItem(item.label);
        router.push(item.path);
    };




    return (
        <div className='w-[90%] xl:w-[80%] mx-auto bg-transparent py-4 flex items-center justify-between '>
            <button>
                <Image
                    src="/images/infinetlogo.svg"
                    alt='infinet logo'
                    width={120}
                    height={200}
                />
            </button>


            {/* menu section */}
            <div className='w-auto gap-x-4 items-center hidden md:flex   mx-auto bg-white/5 backdrop-blur-sm py-2 px-3 rounded-full'>
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleNavigation(item)}
                        className={`text-sm font-semibold px-3 py-1 flex items-center justify-center rounded-full ${activeItem === item.label
                            ? 'bg-white text-primary' // Active item style
                            : 'text-white' // Non-active item style
                            }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>


            {/* merchants button */}
            <div className='hidden md:block'>
                <ButtonSecondary label={'Merchants'} />
            </div>

            {/* <div className='rounded-full w-8 h-8 md:flex hidden items-center justify-center border border-white'>
                <MdBusinessCenter className='text-white' />
            </div> */}

            <div className='rounded-full w-8 h-8 flex md:hidden items-center justify-center border border-white'>
                <GiHamburgerMenu className='text-white' />
            </div>
        </div>
    )
}
