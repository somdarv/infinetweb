import React from 'react'

export default function ButtonPrimary({ label, onClick }) {
    return (
        <button
            className='bg-white flex text-sm  items-center font-semibold justify-center text-primary px-3 w-auto rounded-full py-2'
            onClick={onClick}
        >
            {label}
        </button>
    )
}
