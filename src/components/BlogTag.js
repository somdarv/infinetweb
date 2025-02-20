import React from 'react'

export default function BlogTag({category}) {
    return (
        <div className='w-fit bg-accent/25 p-2 rounded-full'>
            <div className='bg-accent font-semibold rounded-full text-white py-1 px-3 text-xs'>
                {category}
            </div>
        </div>)
}
