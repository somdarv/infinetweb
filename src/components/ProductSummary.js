import Image from 'next/image'
import React from 'react'
import ButtonPrimary from './ButtonPrimary'


export default function ProductSummary() {
    return (
        <div className='w-[90%] my-12 md:w-[80%] mx-auto container-section'>

            <div className='w-[90%] md:w-[80%] mx-auto flex items-center justify-between'>
                <Image
                    src={'/images/card-phone.svg'}
                    height={300}
                    width={300}
                    alt='infinet-mockup'
                />

                <div className='w-full md:w-[50%]'>
                    <h1 className='font-bold text-2xl text-primary'>Infinet Wallet</h1>
                    <p className='mt-2 font-semibold text-sm'>
                        Forget everything you know about mobile money. No more USSD codes. No more waiting for change. No more payment headaches. Just walk in, tap, and go. It's payment at the speed of life. Simple, fast, and always ready when you are.
                    </p>

                    <div className='my-4'>
                        <Image
                            src={'/images/appstores.svg'}
                            height={200}
                            width={200}
                        />
                    </div>


                    {/* <div>
                        <ButtonPrimary label={'Claim Your Card'} />
                    </div> */}
                </div>
            </div>

        </div>
    )
}
