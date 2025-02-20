import Navigation from '@/components/Navigation'
import Image from 'next/image'
import React from 'react'
import BlogTag from './BlogTag'


export default function BlogDetailHeader({title, author, date, imageUrl, categories}) {
    return (
        <div className='w-full container-sectio '>
             {categories && Object.keys(categories).length > 0 && (
                    <BlogTag category={Object.keys(categories)[0]} />
                )}
            <h1 className='w-[80%] my-4 md:w-[90%] text-3xl font-bold '>
               {title}
            </h1>

            <div className='w-full gap-x-2 flex items-center my-2 mx-auto'>
                <Image
                    alt='avatar'
                    src={'/images/usericon.png'}
                    width={35}
                    height={35}
                    className='rounded-full'
                />
                <div className='my-4 gap-x-3 flex items-center justify-center'>
                    <p className='font-semibold text-sm'>{author}</p>
                    <p className='text-sm font-light'>{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
            </div>

            <div className='my-8 w-full flex rounded-xl h-[300px]'>
                <Image
                    src={imageUrl}
                    alt={title}
                    width={200}
                    height={200}
                    layout='responsive'
                    className='w-full object-cover rounded-xl'

                />
            </div>

        </div>
    )
}
