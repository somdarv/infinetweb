'use client'
import { useState, useEffect, lazy, Suspense, useCallback } from 'react'
const BlogCard = lazy(() => import('@/components/BlogCard'))
import ButtonPrimary from '@/components/ButtonPrimary'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import BlogData from '@/data/BlogData'
import Image from 'next/image'
import React from 'react'
import { Router, useRouter } from 'next/navigation';
import { getBlogs } from '@/stores/actions/blogAction';
import { ArrowLeft, ArrowRight } from 'lucide-react';


export default function page() {

    const blogs = BlogData;

    const featuredBlogs = blogData?.filter(blog => blog.is_featured);

    const handleSlideChange = useCallback(
        (direction) => {
          setIsAnimating(true);
          setAnimationClass("fade-out");

          setTimeout(() => {
            setCurrentSlide((prevSlide) =>
              direction === "next"
                ? (prevSlide + 1) % featuredBlogs.length
                : (prevSlide - 1 + featuredBlogs.length) % featuredBlogs.length
            );
            setAnimationClass("fade-in");
            setIsAnimating(false);
          }, 1000); // Match with your CSS animation duration
        },
        [featuredBlogs] // Dependency array: only changes if `featuredBlogs` changes
      );

      useEffect(() => {
        const interval = setInterval(() => handleSlideChange("next"), 10000);
        return () => clearInterval(interval);
      }, [handleSlideChange]); // `handleSlideChange` is stable now


    const handleGetBlogs = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`, { cache: 'no-store' });
            if (!response.ok) return null;
            const resData = await response.json()

            setBlogsData(resData.posts);
        } catch (error) {
            //console.log('Error fetching post:', error);
        } finally {

        }
    }

    useEffect(() => {
        handleGetBlogs()
    }, [handleGetBlogs])



    useEffect(() => {
        setIsClient(true);
    }, []);


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
                {/* Start: Featured Posts */}
                {isClient && featuredBlogs.length > 0 && (
                    <Suspense fallback={<div>Loading header...</div>}>

                        <div className='justify-center'>
                             {/* Start: Left Arrow */}
                             <div
                                className='absolute left-20 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer'
                                onClick={() => handleSlideChange('prev')}
                            >
                                <ArrowRight className='text-white transform rotate-180' />
                            </div>
                            {/* End: Left Arrow */}

                            <div
                                className={`w-full relative cursor-pointer hover:opacity-95 flex items-centerjustify-center  rounded-xl h-[350px] bg-red-200 ${animationClass}`}
                                onClick={() => {
                                    router.push( `/blog/${featuredBlogs[currentSlide]?.slug}`);
                                }}
                            >

                                <Image
                                    src={featuredBlogs[currentSlide]?.cover_art || '/images/BlogHeader.jpg'}
                                    width={200}
                                    height={200}
                                    layout='responsive'
                                    alt={featuredBlogs[currentSlide]?.title}
                                    // fill
                                    className='w-full rounded-2xl flex justify-center items-center object-cover'
                                />

                                <div className='absolute top-4 bottom-4 right-8 left-8'>
                                    <div className='flex flex-col w-full h-full Iitems-end justify-end text-white'>
                                        <div className='w-fit bg-accent/25 p-2 rounded-full'>
                                            <div className='bg-accent/75 font-semibold rounded-full py-1 px-3 text-xs'>
                                                    {Object.keys(featuredBlogs[currentSlide]?.categories)[0] || featuredBlogs[currentSlide]?.category}
                                            </div>
                                        </div>
                                        <h1 className='w-[80%] my-4 md:w-[50%] text-2xl font-bold '>
                                            {featuredBlogs[currentSlide]?.title}
                                        </h1>

                                        <div>
                                            <div className='w-full gap-x-2 flex items-center my-2 mx-auto'>
                                                <Image
                                                    alt='avatar'
                                                    src={'/images/usericon.png'}
                                                    width={35}
                                                    height={35}
                                                    className='rounded-full'
                                                />
                                                <div className='my-4 gap-x-3 flex items-center justify-center'>
                                                    <p className='font-semibold text-sm'>{featuredBlogs[currentSlide]?.authorName || "Author Name"}</p>
                                                    <p className='text-sm font-light'>{new Date(featuredBlogs[currentSlide]?.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Start: Right Arrow */}
                            <div
                                className='absolute right-20 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-primary rounded-full flex items-center justify-center cursor-pointer'
                                onClick={() => handleSlideChange('next')}
                            >
                                <ArrowLeft className='text-white transform rotate-180' />
                            </div>
                            {/* End: Right Arrow */}
                        </div>
                    </Suspense>
                )}
                {/* End: Featured Posts */}

                <div className='flex w-full items-start justify-start flex-wrap gap-4'>
                    {
                        blogData.map((blog, index) => {

                            return (
                                <div className='w-full md:w-[48%] lg:w-[23%]  flex-shrink-0' key={index}>
                                   {isClient && (
                                        <Suspense fallback={<div>Loading header...</div>}>
                                            <BlogCard
                                                title={blog.title}
                                                excerpt={blog.excerpt}
                                                imageUrl={blog.cover_art}
                                                authorName={blog.authorName}
                                                authorImage={blog.authorImage}
                                                date={new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                onClick={() => {
                                                    router.push( `/blog/${blog.slug}`);

                                                }}
                                            />
                                        </Suspense>
                                   )}
                            </div>
                            )
                        })}
                </div>

                <ButtonPrimary label={'Load More'} />
            </div>


            <Footer />

        </div>
    )
}
