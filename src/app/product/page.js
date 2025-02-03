import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import ProductDemo from '@/components/ProductDemo'
import ProductFeatures from '@/components/ProductFeatures'
import ProductSummary from '@/components/ProductSummary'
import React from 'react'


export default function page() {
    return (
        <div className='w-full whitebg bg-red-200 '>
            <div className='bg-primary'>
                <Navigation page={'Product'} className='' />
            </div>

            <ProductDemo />

            <ProductSummary />

            <div className='w-full my-12'>
                <ProductFeatures />
            </div>

            <div>
                <Footer />
            </div>
        </div>
    )
}
