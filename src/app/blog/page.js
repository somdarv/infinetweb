'use client'

import BlogCard from '@/components/BlogCard'
import ButtonPrimary from '@/components/ButtonPrimary'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import BlogData from '@/data/BlogData'
import Image from 'next/image'
import React from 'react'



export default function page() {
    const blogs = BlogData;

    return (
        <div className='w-full container-section'>
            <div className='w-full bg-primary'>
                <Navigation page={'Blog'} />
            </div>


            {/* Page Header */}
            <div className='container-section w-full'>
                <div className='text-center w-[90%] md:w-[80%] mx-auto md:text-left my-8'>

                    <p className='text-[#D66BA0] font-semibold text-center text-lg'>Our Blog</p>
                    <h1 className='monument-regular text-primary text-center my-2 text-3xl'>Thoughts & Insights</h1>


                </div>
            </div>


            <div className='w-[90%] md:w-[80%] mx-auto'>
                <div className='w-full relative cursor-pointer hover:opacity-95 flex items-centerjustify-center  rounded-xl h-[350px] bg-red-200'>
                    <Image
                        src={'/images/BlogHeader.jpg'}
                        width={200}
                        height={200}
                        // fill
                        className='w-full rounded-2xl flex justify-center items-center object-cover'
                    />

                    <div className='absolute top-4 bottom-4 right-8 left-8'>
                        <div className='flex flex-col w-full h-full Iitems-end justify-end text-white'>
                            <div className='w-fit bg-accent/25 p-2 rounded-full'>
                                <div className='bg-accent/75 font-semibold rounded-full py-1 px-3 text-xs'>
                                    Technology
                                </div>
                            </div>
                            <h1 className='w-[80%] my-4 md:w-[50%] text-2xl font-bold '>
                                The Impact of Technology on the Workplace: How Technology is Changing
                            </h1>

                            <div>
                                <div className='w-full gap-x-2 flex items-center my-2 mx-auto'>
                                    <Image alt='avatar' src={'/images/blogimg2.png'} width={35} height={35} className='rounded-full' />
                                    <div className='my-4 gap-x-3 flex items-center justify-center'>
                                        <p className='font-semibold text-sm'>Pagwuni Radia</p>
                                        <p className='text-sm font-light'>February 6, 2025</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex w-full items-start justify-between flex-wrap gap-4'>
                    {
                        blogs.map((blog, index) => (
                            <div className='w-full md:w-[48%] lg:w-[23%]  flex-shrink-0' key={index}>
                                <BlogCard
                                    title={blog.title}
                                    excerpt={blog.excerpt}
                                    imageUrl={blog.imageUrl}
                                    authorName={blog.authorName}
                                    authorImage={blog.authorImage}
                                    date={blog.date}
                                    onClick={() => {
                                        console.log(`Clicked blog: ${blog.title}`)
                                    }}
                                />
                            </div>
                        ))
                    }
                </div>

                <ButtonPrimary label={'Load More'} />
            </div>


            <Footer />

        </div>
    )
}
