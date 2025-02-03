import React from 'react'

export default function ButtonSecondary({ label }) {
    return (
        <button className=' rounded-full w-auto text-white text-sm font-semibold border-white border flex items-center justify-center px-3 py-2'>
            {label}
        </button>
    )
}
