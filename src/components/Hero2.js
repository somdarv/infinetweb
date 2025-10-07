'use client'

import Image from 'next/image'
import React, { useState, useEffect, useCallback } from 'react'
import ButtonPrimary from './ButtonPrimary'
import ButtonSecondary from './ButtonSecondary'
import { Clock, CreditCard, Globe, Zap, ArrowLeft, Check, Loader2, AlertCircle, Receipt } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import CardServices from './CardServices'
import axios from 'axios'
import Swal from 'sweetalert2'

//Import analytics functions
import {
    trackCardCreationStep,
    trackFormInteraction, 
    trackPaymentInitiated, 
    trackPaymentCompleted,
    trackError,
    trackFormAbandonment,
    trackTimeOnPage
} from '@/lib/analytics'


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function Hero2() {
    const [showForm, setShowForm] = useState(false)
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        cardPurpose: 'visacard-1',
        email: '',
        amountUSD: ''
    })

    const [cardholderData, setCardholderData] = useState(null)
    const [paymentData, setPaymentData] = useState(null)
    const [cardDetails, setCardDetails] = useState(null)
    
    // Exchange rate USD to GHS (you can make this dynamic by fetching from an API)
    const exchangeRate = 14.1 // 1 USD = 14.1 GHS
    const feePercentage = 0.03 // 3% fee
    const issuanceFee = 2 // $2 fixed issuance fee
    const fundingFeePercentage = 0.03 // 3% funding fee

        // Track when user enters form
        useEffect(() => {
            if (showForm) {
                trackFormInteraction('form_started');
                trackCardCreationStep(1, formData);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [showForm]); // Disabled exhaustive-deps for this specific case


        // Track step changes
        useEffect(() => {
            if (step > 1) {
                trackCardCreationStep(step, formData);
            }
             // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [step]);
    
        // Track abandonment on page unload
        useEffect(() => {
            const handleBeforeUnload = () => {
                if (showForm && step < 3) {
                    trackFormAbandonment(step, formData);
                    trackTimeOnPage('hero_card_creation');
                }
            };
    
            window.addEventListener('beforeunload', handleBeforeUnload);
            return () => window.removeEventListener('beforeunload', handleBeforeUnload);
        }, [showForm, step, formData]);

    const FeatureTag = ({ children }) => (
        <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white/90 flex items-center gap-2">
            {children}
        </div>
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Validate single name (no spaces) for firstName and lastName
        if ((name === 'firstName' || name === 'lastName') && value.includes(' ')) {
            setError(`${name === 'firstName' ? 'First' : 'Last'} name must be a single word (no spaces)`);
            return;
        }

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setError('')

        // Track field completion
        if (value) {
            trackFormInteraction('field_completed', name);
        }
    }

    const handleGetCard = () => {
        setShowForm(true)
        // Track button click
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'get_card_clicked', {
                button_location: 'hero_section'
            });
        }
    }

    const handleBack = () => {
         // Track user going back
         if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'navigation_back', {
                from_step: step
            });
        }

        if (step === 1) {
            setShowForm(false)
            setFormData({
                firstName: '',
                lastName: '',
                cardPurpose: 'visacard-1',
                email: '',
                amountUSD: ''
            })
            setError('')
        } else if (step === 2) {
            setStep(1)
            setPaymentData(null)
            setError('')
        } else if (step === 3) {
            setStep(1)
            setShowForm(false)
            setCardDetails(null)
            setCardholderData(null)
            setPaymentData(null)
            setFormData({
                firstName: '',
                lastName: '',
                cardPurpose: 'visacard-1',
                email: '',
                amountUSD: ''
            })
        }
    }

    const handleContinue = async () => {
        if (formData.firstName && formData.lastName && formData.email && formData.amountUSD) {
            setLoading(true)
            setError('')

            // Track continue button click
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'continue_to_review', {
                    card_type: formData.cardPurpose,
                    amount: formData.amountUSD
                });
            }

            try {
                // Create cardholder account
                const response = await axios.post(`${API_BASE_URL}/virtual/card/create-holder`, {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    cardPurpose: formData.cardPurpose
                })

                if (response.data.success) {
                    setCardholderData(response.data.data)
                    
                    // Initialize payment (get payment reference and fee breakdown)
                    const paymentResponse = await axios.post(`${API_BASE_URL}/virtual/card/initialize-payment`, {
                        cardholder_id: response.data.data.cardholder_id,
                        amount_usd: formData.amountUSD,
                        email: formData.email,
                        purpose: formData.cardPurpose
                    })

                    if (paymentResponse.data.success) {
                        setPaymentData(paymentResponse.data.data)
                        setStep(2) // Move to review step
                    } else {
                        trackError('payment_initialization_failed', paymentResponse.data.message);
                        Swal.fire({
                            icon: 'error',
                            title: 'Payment Initialization Failed',
                            text: paymentResponse.data.message || 'Failed to initialize payment',
                            confirmButtonColor: '#3B82F6',
                            background: '#1F2937',
                            color: '#fff'
                        })
                    }
                } else {
                    trackError('cardholder_creation_failed', response.data.message);
                    Swal.fire({
                        icon: 'error',
                        title: 'Cardholder Creation Failed',
                        text: response.data.message || 'Failed to create cardholder',
                        confirmButtonColor: '#3B82F6',
                        background: '#1F2937',
                        color: '#fff'
                    })
                }
            } catch (err) {
                console.error('Error:', err)
                trackError('api_error', err.response?.data?.message || err.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops! Something went wrong',
                    text: err.response?.data?.message || 'An error occurred. Please try again.',
                    confirmButtonColor: '#3B82F6',
                    background: '#1F2937',
                    color: '#fff'
                })
            } finally {
                setLoading(false)
            }
        }
    }

    const calculateBreakdown = () => {
        const amount = parseFloat(formData.amountUSD) || 0
        const issuance = issuanceFee
        const funding = amount * fundingFeePercentage
        const totalUSD = amount + issuance + funding
        const totalGHS = totalUSD * exchangeRate
        
        return {
            cardAmount: amount,
            issuanceFee: issuance,
            fundingFee: funding,
            totalUSD: totalUSD,
            totalGHS: totalGHS
        }
    }

    const handlePayment = () => {
        if (!paymentData) {
            trackError('payment_data_missing', 'Payment data not available');
            Swal.fire({
                icon: 'error',
                title: 'Payment Error',
                text: 'Payment data not available',
                confirmButtonColor: '#3B82F6',
                background: '#1F2937',
                color: '#fff'
            })
            return
        }
    
        const breakdown = paymentData.breakdown // Use the breakdown from backend

        // Track payment initiation
        trackPaymentInitiated(breakdown.total_ghs, 'GHS');
        
        // Initialize Paystack with proper callback
        const handler = window.PaystackPop.setup({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
            email: formData.email,
            amount: Math.round(parseFloat(breakdown.total_ghs) * 100), // Amount in pesewas
            currency: 'GHS',
            ref: paymentData.payment_reference,
            metadata: {
                custom_fields: [
                    {
                        display_name: "Customer Name",
                        variable_name: "customer_name",
                        value: `${formData.firstName} ${formData.lastName}`
                    },
                    {
                        display_name: "Card Type",
                        variable_name: "card_type",
                        value: formData.cardPurpose
                    },
                    {
                        display_name: "Card Amount",
                        variable_name: "card_amount",
                        value: breakdown.card_amount_usd
                    },
                    {
                        display_name: "Total Amount",
                        variable_name: "total_amount",
                        value: breakdown.subtotal_usd
                    }
                ]
            },
            callback: function(response) {
                // Don't use async here - handle it synchronously and call async function
                handlePaymentSuccess(response.reference, paymentData.payment_reference)
            },
            onClose: function() {
                 // Track payment window closure
                 if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'payment_window_closed', {
                        reference: paymentData.payment_reference
                    });
                }
                console.log('Payment window closed')
            }
        });
        
        handler.openIframe();
    }
    
    // Separate async function for payment verification
    const handlePaymentSuccess = async (paystackReference, paymentReference) => {
        setLoading(true)
        try {
            // Verify payment and create/fund card
            const verifyResponse = await axios.post(`${API_BASE_URL}/virtual/card/verify-payment`, {
                reference: paystackReference,
                payment_reference: paymentReference
            })
    
            if (verifyResponse.data.success) {
                // Track successful payment
                trackPaymentCompleted(paystackReference, paymentData.breakdown.total_ghs);

                // Get card details
                const detailsResponse = await axios.get(
                    `${API_BASE_URL}/virtual/card/details/${verifyResponse.data.data.card_id}`
                )
    
                if (detailsResponse.data.success) {
                    setCardDetails(detailsResponse.data.data)
                    setStep(3)
                    
                    // Success notification
                    Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful!',
                        text: 'Your virtual card has been created and funded',
                        confirmButtonColor: '#3B82F6',
                        background: '#1F2937',
                        color: '#fff',
                        timer: 3000,
                        timerProgressBar: true
                    })
                } else {
                    trackError('card_details_fetch_failed', 'Failed to retrieve card details');
                    Swal.fire({
                        icon: 'warning',
                        title: 'Card Created',
                        text: 'Payment successful but failed to retrieve card details. Check your email or contact support.',
                        confirmButtonColor: '#3B82F6',
                        background: '#1F2937',
                        color: '#fff'
                    })
                }
            } else {
                trackError('payment_verification_failed', verifyResponse.data.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Payment Verification Failed',
                    text: verifyResponse.data.message || 'Payment verification failed',
                    confirmButtonColor: '#3B82F6',
                    background: '#1F2937',
                    color: '#fff'
                })
            }
        } catch (err) {
            console.error('Payment verification error:', err)
            trackError('payment_verification_error', err.response?.data?.message || err.message);
            Swal.fire({
                icon: 'error',
                title: 'Verification Error',
                text: err.response?.data?.message || 'Failed to verify payment. Please contact support if amount was deducted.',
                confirmButtonColor: '#3B82F6',
                background: '#1F2937',
                color: '#fff'
            })
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className='w-full bg-red- min-h-screen'>
            <div className='w-full flex flex-wrap items-center justify-between pt-20'>
                <div className='w-full md:w-[50%] relative'>
                    <Image
                        src={'/images/cards.webp'}
                        width={1080}
                        height={1080}
                        className='w-full md:w-[80%] mx-auto'
                        alt='Infinet-Virtual-Cards'
                        unoptimized
                    />
                </div>

                <div className='w-full md:w-[50%]'>
                    <AnimatePresence mode="wait">
                        {!showForm ? (
                            <motion.div
                                key="hero-content"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h1 className="font-hogira w-full text-white text-3xl mb-2">Infinet</h1>
                                <h1 className="font-erstoria w-full text-white text-5xl md:text-7xl">Virtual Cards</h1>
                                <p className='text-white w-full md:w-[70%] text-lg my-4 md:my-8'>
                                    Your digital world deserves better cards. Shop, stream, and subscribe instantly with virtual cards that work everywhere. No hassle, just freedom.
                                </p>

                                <div className="flex flex-wrap gap-3 mb-8">
                                    <FeatureTag>
                                        <Globe className="w-4 h-4" />
                                        Global Acceptance
                                    </FeatureTag>
                                    <FeatureTag>
                                        <Zap className="w-4 h-4" />
                                        Instant Setup
                                    </FeatureTag>
                                    <FeatureTag>
                                        <CreditCard className="w-4 h-4" />
                                        Zero Fees
                                    </FeatureTag>
                                </div>

                                <div className='flex items-center gap-x-3'>
                                    <ButtonPrimary label={'Get A Card'} onClick={handleGetCard}/>
                                    <ButtonSecondary label={'Learn More'} />
                                </div>
                            </motion.div>
                        ) : step === 1 ? (
                            <motion.div
                                key="form-step-1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white/10 backdrop-blur-lg p-4 sm:p-6 md:p-8 rounded-2xl"
                            >
                                <button 
                                    onClick={handleBack}
                                    className="flex items-center gap-2 text-white/80 hover:text-white mb-4 sm:mb-6 transition-colors text-sm"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back
                                </button>

                                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Get Your Card</h2>
                                <p className="text-white/70 mb-4 sm:mb-6 text-sm">Step 1 of 2 - Personal Information</p>

                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                        <div className="flex-1">
                                            <label className="block text-white/90 mb-1.5 sm:mb-2 text-xs sm:text-sm">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white/20 border border-white/30 text-white text-sm placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors"
                                                placeholder="First name must be a single word"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <label className="block text-white/90 mb-1.5 sm:mb-2 text-xs sm:text-sm">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white/20 border border-white/30 text-white text-sm placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors"
                                                placeholder="Last name must be a single word"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-white/90 mb-1.5 sm:mb-2 text-xs sm:text-sm">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white/20 border border-white/30 text-white text-sm placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors"
                                                placeholder="your@email.com"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <label className="block text-white/90 mb-1.5 sm:mb-2 text-xs sm:text-sm">Card Type</label>
                                            <select
                                                name="cardPurpose"
                                                value={formData.cardPurpose}
                                                onChange={handleInputChange}
                                                disabled={loading}
                                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-white/20 border border-white/30 text-white text-sm focus:outline-none focus:border-white/60 transition-colors"
                                            >
                                                <option value="visacard-1" className="bg-gray-800">Visa</option>
                                                <option value="mastercard-1" className="bg-gray-800">Mastercard</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-white/90 mb-2 text-sm">Card Amount (USD)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 text-lg">$</span>
                                            <input
                                                type="number"
                                                name="amountUSD"
                                                value={formData.amountUSD}
                                                onChange={handleInputChange}
                                                min="1"
                                                step="0.01"
                                                disabled={loading}
                                                className="w-full pl-8 pr-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors"
                                                placeholder="Enter amount to load on card"
                                            />
                                        </div>
                                        {formData.amountUSD && (
                                            <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/20">
                                                <p className="text-white/80 text-sm mb-2 font-semibold">Quick Estimate:</p>
                                                <div className="space-y-1 text-xs text-white/70">
                                                    <div className="flex justify-between">
                                                        <span>Card balance:</span>
                                                        <span className="text-white">${parseFloat(formData.amountUSD).toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Issuance fee:</span>
                                                        <span className="text-white">${issuanceFee.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Funding fee (3%):</span>
                                                        <span className="text-white">${(parseFloat(formData.amountUSD) * fundingFeePercentage).toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between pt-2 border-t border-white/20 font-semibold">
                                                        <span className="text-white">Total to pay:</span>
                                                        <span className="text-green-300">≈ GHS {calculateBreakdown().totalGHS.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={handleContinue}
                                        disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.amountUSD || loading}
                                        className="w-full py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Review Payment
                                                <ArrowLeft className="w-4 h-4 rotate-180" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        ) : step === 2 ? (
                            <motion.div
                                key="form-step-2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl"
                            >
                                <button 
                                    onClick={handleBack}
                                    className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                                    disabled={loading}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back
                                </button>
                        
                                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <Receipt className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-white">Review & Pay</h2>
                                        <p className="text-xs md:text-sm text-white/70">Step 2 of 2 - Confirm your order</p>
                                    </div>
                                </div>
                        
                                {/* Customer Info Card */}
                                <div className="bg-white/5 rounded-xl p-5 mb-4 border border-white/10">
                                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                                        <CreditCard className="w-4 h-4" />
                                        Card Details
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between text-white/80">
                                            <span>Cardholder:</span>
                                            <span className="font-semibold text-white">{formData.firstName} {formData.lastName}</span>
                                        </div>
                                        <div className="flex justify-between text-white/80">
                                            <span>Email:</span>
                                            <span className="font-semibold text-white">{formData.email}</span>
                                        </div>
                                        <div className="flex justify-between text-white/80">
                                            <span>Card Type:</span>
                                            <span className="font-semibold text-white uppercase">
                                                {formData.cardPurpose === 'visacard-1' ? '💳 VISA' : '💳 MASTERCARD'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                        
                                {/* Pricing Breakdown - Use backend data */}
                                {paymentData && (
                                    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 md:p-6 mb-3 md:mb-4 border border-white/20">
                                        <h3 className="text-white font-semibold mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base">
                                            <Receipt className="w-3 h-3 md:w-4 md:h-4" />
                                            Payment Breakdown
                                        </h3>
                                        <div className="space-y-2 md:space-y-3">
                                            <div className="flex justify-between items-center text-white/80">
                                                <div>
                                                    <div className="font-medium text-white text-sm md:text-base">Card Balance</div>
                                                    <div className="text-[10px] md:text-xs text-white/60">Amount loaded to your card</div>
                                                </div>
                                                <span className="font-bold text-white text-base md:text-lg">${paymentData.breakdown.card_amount_usd}</span>
                                            </div>
                                            
                                            <div className="border-t border-white/10 pt-2 md:pt-3">
                                                <div className="flex justify-between items-center text-white/70 mb-1 md:mb-2">
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-xs md:text-sm">Issuance Fee</span>
                                                        <div className="group relative">
                                                            <AlertCircle className="w-3 h-3 cursor-help" />
                                                            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-40 md:w-48 p-2 bg-gray-900 text-white text-[10px] md:text-xs rounded-lg shadow-lg z-10">
                                                                One-time fee for creating your virtual card
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="font-semibold text-white text-xs md:text-sm">${paymentData.breakdown.issuance_fee_usd}</span>
                                                </div>
                                                
                                                <div className="flex justify-between items-center text-white/70">
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-xs md:text-sm">Funding Fee (3%)</span>
                                                        <div className="group relative">
                                                            <AlertCircle className="w-3 h-3 cursor-help" />
                                                            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-40 md:w-48 p-2 bg-gray-900 text-white text-[10px] md:text-xs rounded-lg shadow-lg z-10">
                                                                Processing fee for loading funds onto your card
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="font-semibold text-white text-xs md:text-sm">${paymentData.breakdown.funding_fee_usd}</span>
                                                </div>
                                            </div>
                                    
                                            <div className="border-t border-white/20 pt-2 md:pt-3 mt-2 md:mt-3">
                                                <div className="flex justify-between items-center mb-1 md:mb-2">
                                                    <span className="text-white font-semibold text-sm md:text-base">Subtotal (USD)</span>
                                                    <span className="font-bold text-white text-lg md:text-xl">${paymentData.breakdown.subtotal_usd}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-[10px] md:text-xs text-white/60 mb-1 md:mb-2">
                                                    <span>Exchange Rate</span>
                                                    <span>1 USD = {paymentData.breakdown.exchange_rate} GHS</span>
                                                </div>
                                            </div>
                                    
                                            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-3 md:p-4 border border-green-400/30">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <div className="text-green-300 text-xs md:text-sm font-medium">Total Amount</div>
                                                        <div className="text-white/60 text-[10px] md:text-xs">Amount to be charged</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-green-300 font-bold text-xl md:text-2xl">
                                                            GHS {paymentData.breakdown.total_ghs}
                                                        </div>
                                                        <div className="text-white/60 text-[10px] md:text-xs">
                                                            ≈ ${paymentData.breakdown.subtotal_usd} USD
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                        
                                {/* What You Get */}
                                <div className="bg-blue-500/10 rounded-xl p-4 mb-6 border border-blue-400/30">
                                    <h4 className="text-blue-300 font-semibold mb-2 md:mb-3 text-xs md:text-sm flex items-center gap-2">
                                        <Check className="w-3 h-3 md:w-4 md:h-4" />
                                        What You&apos;ll Get
                                    </h4>
                                    <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-white/80">
                                        <li className="flex items-start gap-2">
                                            <Check className="w-3 h-3 md:w-4 md:h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                            <span>Virtual {formData.cardPurpose === 'visacard-1' ? 'VISA' : 'Mastercard'} card with ${formData.amountUSD} balance</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                            <span>Instant card details (number, CVV, expiry)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                            <span>Global acceptance for online purchases</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                            <span>Secure transactions with fraud protection</span>
                                        </li>
                                    </ul>
                                </div>
                        
                                {/* Payment Button */}
                                <button
                                    onClick={handlePayment}
                                    disabled={loading || !paymentData}
                                    className="w-full py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-base md:text-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                                            <span className="text-sm md:text-base">Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <CreditCard className="w-4 h-4 md:w-5 md:h-5" />
                                            <span>Pay GHS {paymentData?.breakdown.total_ghs}</span>
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-white/50 text-[10px] md:text-xs mt-3 md:mt-4">
                                    Secured by Paystack • Your payment is safe and encrypted
                                </p>
                        
                            </motion.div>
                        ) : (
                            <motion.div
                                key="card-receipt"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl"
                            >
                                <div className="flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mx-auto mb-4">
                                    <Check className="w-8 h-8 text-green-400" />
                                </div>

                                <h2 className="text-3xl font-bold text-white mb-2 text-center">Card Created!</h2>
                                <p className="text-white/70 mb-8 text-center">Your virtual card is ready to use</p>

                                {/* Virtual Card Display */}
                                <div className="max-w-md mx-auto bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 mb-6 aspect-[1.6/1] relative overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                                    
                                    <div className="relative z-10 h-full flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div className="text-white/90 text-sm font-semibold">INFINET</div>
                                            <div className="text-white font-bold text-lg">{cardDetails?.card_type?.toUpperCase()}</div>
                                        </div>
                                        
                                        <div>
                                            <div className="text-white text-xl font-mono tracking-wider mb-1">
                                                {cardDetails?.card_number || cardDetails?.masked_number}
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <div className="text-white/70 text-xs mb-1">CARDHOLDER</div>
                                                <div className="text-white font-semibold text-sm uppercase">{cardDetails?.card_name}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-white/70 text-xs mb-1">EXPIRES</div>
                                                <div className="text-white font-semibold">{cardDetails?.expiry_date}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Details */}
                                <div className="bg-white/5 rounded-xl p-6 space-y-4 mb-6 border border-white/10">
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/80">Card Balance:</span>
                                        <span className="font-bold text-green-400 text-xl">${cardDetails?.balance === 0 ? formData.amountUSD : cardDetails?.balance}</span>
                                    </div>
                                    <div className="border-t border-white/10 pt-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-white/60 text-xs mb-1">CVV</div>
                                                <div className="font-mono font-bold text-white text-lg">{cardDetails?.cvv}</div>
                                            </div>
                                            <div>
                                                <div className="text-white/60 text-xs mb-1">Status</div>
                                                <div className="font-semibold text-green-400 uppercase text-sm">{cardDetails?.status}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t border-white/10 pt-4">
                                        <div className="text-white/60 text-xs mb-2">Billing Address</div>
                                        <div className="text-white text-sm">
                                            {cardDetails?.billing_address?.line1}<br />
                                            {cardDetails?.billing_address?.city}, {cardDetails?.billing_address?.state} {cardDetails?.billing_address?.zip}<br />
                                            {cardDetails?.billing_address?.country}
                                        </div>
                                    </div>
                                </div>

                                {/* Important Notice */}
                                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                                    <div className="flex gap-3">
                                        <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                        <div className="text-sm">
                                            <p className="text-yellow-300 font-semibold mb-1">Important</p>
                                            <p className="text-white/80">
                                                Save your card details securely. This information has also been sent to your email: <span className="font-semibold text-white">{formData.email}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleBack}
                                    className="w-full py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                                >
                                    Create Another Card
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {!showForm && (
                <div className='w-full'>
                    <CardServices />
                </div>
            )}
        </div>
    )
}