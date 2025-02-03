import { CloudCog } from 'lucide-react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";





export default function HowItWorks() {

    const HowItWorksItems = [
        {
            id: 1,
            src: '/images/usericon.png',
            title: 'Claim Your Card',
            text: 'Sign up with just your phone number on the Infinet app or website and claim your card! No hasssle, no fuss!',
            externalLink: 'Sign Up Now',
            goto: '',
        },
        {
            id: 2,
            src: '/images/exploreicon.png',
            title: 'Explore Events',
            text: 'Navigate to the Events section to discover exciting events happening near you. Browse, select, and purchase your tickets seamlessly using your Infinet Wallet.',
            externalLink: '',
            goto: '',
        },

        {
            id: 3,
            src: '/images/entericon.png',
            title: 'Explore Events',
            text: "At the event, simply tap your card at the entry point, and you're in! No queues, no paper tickets – just smooth, contactless entry.",
            externalLink: '',
            goto: '',
        },
        {
            id: 4,
            src: '/images/entericon.png',
            title: 'Explore Eventsssss',
            text: "At the event, simply tap your card at the entry point, and you're in! No queues, no paper tickets – just smooth, contactless entry.",
            externalLink: '',
            goto: '',
        },
    ]


    const ITEMS_PER_PAGE = 2; // Number of items to display per page
    const totalPages = Math.ceil(HowItWorksItems.length / ITEMS_PER_PAGE);

    const [currentPage, setCurrentPage] = useState(1);

    // Auto Slide Effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPage((prevPage) => (prevPage % totalPages) + 1);
        }, 4000); // Slide every 4 seconds
        return () => clearInterval(interval);
    }, [totalPages]);

    // Next Page
    const goToNext = () => {
        setCurrentPage((prevPage) => (prevPage % totalPages) + 1);
    };

    // Previous Page
    const goToPrev = () => {
        setCurrentPage((prevPage) => (prevPage === 1 ? totalPages : prevPage - 1));
    };

    // Calculate items to display based on currentPage
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const displayedItems = HowItWorksItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    console.log(displayedItems.length)



    return (
        <div className='bg-primary rounded-3xl container-component py-8 '>
            <div className='w-[90%] md: w-[80%]'>
                <div className='container-section'>
                    {/* Header */}
                    <h1 className='text-white text-2xl w-full'>How It Works</h1>

                    {/* main content */}

                    <div className="container-section relative overflow-hidden flex">
                        {/* Sliding Container for Items */}
                        <div
                            className="flex  w-full transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${(currentPage - 1) * 100}%)` }}
                        >
                            {Array.from({ length: totalPages }).map((_, pageIndex) => {
                                const start = pageIndex * ITEMS_PER_PAGE;
                                const end = start + ITEMS_PER_PAGE;
                                const pageItems = HowItWorksItems.slice(start, end);

                                return (
                                    <div key={pageIndex} className=" flex-shrink-0 flex flex-col space-y-4">
                                        {pageItems.map((item) => (
                                            <div key={item.id} className="flex items-start space-x-4 py-4 w-[90%]">
                                                {/* Icon */}
                                                <div className="w-24 h-24 flex justify-center items-center rounded-3xl bg-white">
                                                    <Image
                                                        src={item.src}
                                                        width={200}
                                                        height={200}
                                                        alt={item.title}
                                                        className="w-[70%] mx-auto"
                                                    />
                                                </div>

                                                {/* Text */}
                                                <div className="text-white">
                                                    <h2 className="font-semibold text-xl">{item.title}</h2>
                                                    <p className="text-sm mt-2">
                                                        {item.text}
                                                        {item.externalLink && (
                                                            <span className="font-bold text-sm hover:cursor-pointer hover:underline ml-1">
                                                                {item.externalLink}
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right Side - Static Image */}
                        <div className="w-[50%] flex items-center justify-center">
                            <Image
                                src={'/images/cards.png'}
                                width={400}
                                height={400}
                                alt="Cards"
                                className="w-[70%] mx-auto"
                            />
                        </div>
                    </div>



                    {/* footer */}
                    < div className='container-section' >
                        <div className="flex items-start justify-center space-x-1">
                            <span className="text-  text-white">{currentPage}</span>
                            <span className="text-xs  text-gray-500">/{totalPages}</span>
                        </div>


                        <div>
                            {/* Navigation Controls */}
                            <div className="flex justify-center items-center space-x-6">
                                <button
                                    onClick={goToPrev}
                                    className="text-white w-8 h-8 flex justify-center items-center border border-white rounded-full  hover:bg-purple-500 transition-all duration-300"
                                >
                                    <IoChevronBackOutline />
                                </button>
                                {/* Pagination */}
                                <div className="flex space-x-2">
                                    {Array.from({ length: totalPages }).map((_, index) => (
                                        <span
                                            key={index}
                                            onClick={() => setCurrentPage(index + 1)} // Set currentPage instead of currentIndex
                                            className={`rounded-full cursor-pointer transition-all duration-300 ${currentPage === index + 1
                                                ? 'bg-purple-500 w-6 h-2'
                                                : 'bg-white/50 w-2 h-2'
                                                }`}
                                        ></span>
                                    ))}
                                </div>

                                <button
                                    onClick={goToNext}
                                    className="text-white w-8 h-8 flex justify-center items-center border border-white rounded-full  hover:bg-purple-500 transition-all duration-300"                                >
                                    <IoChevronForwardOutline />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
