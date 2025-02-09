import AuthorSignature from '@/components/AuthorSignature'
import BlogContent from '@/components/BlogContent'
import BlogDetailHeader from '@/components/BlogDetailHeader'
import Navigation from '@/components/Navigation'
import PageNav from '@/components/PageNav'
import ScrollToTop from '@/components/ScrollToTop'
import Image from 'next/image'
import React from 'react'




export default function page() {
    return (
        <div>
            <div className='w-full bg-primary'>
                <Navigation page={'Blog'} />
            </div>

            <div className='w-[90%] md:w-[50%] mx-auto my-4'>
                <BlogDetailHeader />
            </div>

            <div className='w-[90%] md:w-[50%] mx-auto'>
                <BlogContent />
            </div>




            <div className='w-[50%] mx-auto'>
                <AuthorSignature
                    name="Pagwuni Radia"
                    role="Senior Tech Writer"
                    image="/images/blogimg2.png"
                    bio="Radia is a tech enthusiast with over 8 years of experience in software development and technical writing. She's passionate about making complex topics accessible to everyone."
                    date="Feb 9, 2024"
                />            </div>




            <div className='w-[50%] mx-auto'>
                <PageNav
                    prevPage="/blog/previous-post"
                    nextPage="/blog/next-post"
                    prevTitle="Replacing An Infinet Card"
                    nextTitle="How to Become VIP"
                    prevSubtitle="Walkthrough Tutorial"
                    nextSubtitle="Getting Started"

                />
            </div>


            <div className='w-[90%] md:w-[50%] mx-auto'>
                <ScrollToTop />
            </div>

        </div>
    )
}
