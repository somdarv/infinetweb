
'use client'
import React, { useState, useEffect } from 'react'

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)
        return () => {
            window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-accent hover:bg-accent/80 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
                    aria-label="Scroll to top"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                    </svg>
                </button>
            )}
        </>
    )
}

export default ScrollToTop