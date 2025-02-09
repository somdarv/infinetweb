'use client'

import Image from 'next/image'
import React from 'react'


export default function BlogCard({
    title,
    excerpt,
    imageUrl,
    authorName,
    authorImage,
    date,
    onClick
}) {
    return (
        <div
            className='my-8 bg-[#F9F9F9] hover:bg-[#ececec] flex flex-col justify-between h-[400px] hover:shadow-sm rounded-xl cursor-pointer'
        // onClick={onClick}
        >
            <div>
                <div className='rounded-2xl w-full p-2'>
                    <Image
                        src={imageUrl || '/images/blogimg.png'}
                        className='w-full rounded-2xl'
                        alt={title}
                        width={100}
                        height={100}
                    />
                </div>

                <div className='w-[80%] my-2 mx-auto'>
                    <p className='font-semibold items-start'>{title}</p>
                    <p className='text-[10px] my-4'>
                        {excerpt}
                    </p>
                </div>
            </div>

            {/* footer */}
            <div className='w-[80%] gap-x-2 flex items-end my-2 mx-auto'>
                <Image
                    alt={`${authorName} avatar`}
                    src={authorImage || '/images/blogimg2.png'}
                    width={35}
                    height={35}
                    className='rounded-full'
                />
                <div className='my-'>
                    <p className='font-semibold text-[12px]'>{authorName}</p>
                    <p className='text-[10px]'>{date}</p>
                </div>
            </div>
        </div>
    )
}
