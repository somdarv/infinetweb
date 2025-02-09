import Navigation from '@/components/Navigation'
import Image from 'next/image'
import React from 'react'
import BlogTag from './BlogTag'


export default function BlogDetailHeader() {
    return (
        <div className='w-full container-sectio '>
            <BlogTag />
            <h1 className='w-[80%] my-4 md:w-[90%] text-3xl font-bold '>
                The Impact of Technology on the Workplace: How Technology is Changing
            </h1>

            <div className='w-full gap-x-2 flex items-center my-2 mx-auto'>
                <Image alt='avatar' src={'/images/blogimg2.png'} width={35} height={35} className='rounded-full' />
                <div className='my-4 gap-x-3 flex items-center justify-center'>
                    <p className='font-semibold text-sm'>Pagwuni Radia</p>
                    <p className='text-sm font-light'>February 6, 2025</p>
                </div>
            </div>

            <div className='my-8 w-full flex rounded-xl h-[300px]'>
                <Image
                    src={'/images/BlogHeader.jpg'}
                    width={200}
                    height={200}
                    className='w-full object-cover rounded-xl'

                />
            </div>

        </div>
    )
}
