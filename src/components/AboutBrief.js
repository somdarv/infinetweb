import React from 'react'
import ButtonPrimary from './ButtonPrimary'
import ButtonSecondary from './ButtonSecondary'

export default function AboutBrief() {
    return (
        <div className='container-component'>

            <div className='container-section w-[70%] mx-auto  flex'>

                <div className=' '>
                    <h1 className='text-white text-xl'>Effortless Entry, <br /> Unmatched Convenience</h1>
                    <h1 className='font-semibold -mt-2 text-white text-[56px] my-2 '>
                        Choose Infinet
                    </h1>
                </div>

                <div className='w-[35%]'>
                    <p className='text-sm text-white'>
                        Experience the future of event access with Infinet’s contactless e-ticket cards. Our innovative solution takes the hassle out of traditional tickets, letting you tap and go with ease. No more queues, no more waiting – just a quick, secure, and easy way to access events, shows, and venues.
                    </p>
                    <div className='my-4'>
                        <ButtonSecondary label={'Discover More'} />
                    </div>
                </div>

            </div>
        </div>
    )
}
