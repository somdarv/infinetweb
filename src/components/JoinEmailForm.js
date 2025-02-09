'use client'

import { Formik, useFormik, validateYupSchema } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup';




export default function JoinEmailForm() {
    const [join, setJoin] = useState(false);
    const formik = useFormik({
        initialValues: { email: '' },
        validateYupSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },

    },
    )

    return (
        <div className='w-full'>
            <div className='my-4 w-full flex justify-center md:justify-start'>
                <div className='w-full'>

                    <form className={`rounded-full w-full py- pl-6 ${formik.touched.email && formik.errors.email ? 'border-red-600' : ''} bg-white border-primary border-2 flex items-center  `} onSubmit={formik.handleSubmit}>

                        <input
                            id='email'
                            name='email'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            type="email"
                            className='bg-transparent outline-none w-[70%]'
                            placeholder='Email Address' />

                        <div className='flex justify-end my-1 mr-1 w-[30%]'>
                            <button onClick={() => setJoin(!join)} className='bg-primary text-white px-8 py-2 rounded-full'>
                                Send
                            </button>
                        </div>

                    </form>




                </div>
            </div>
        </div>
    )
}
