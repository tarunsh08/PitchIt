import { auth } from '@/auth'
import StartupForm from '@/components/StartupForm'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {
    const session = await auth()

    if(!session) redirect('/')
        
    return (
        <>
            <section className='bg-gradient-to-br from-purple-400 via-fuchsia-400 to-pink-400 h-[50vh] flex items-center justify-center relative overflow-hidden'>
                <div className='absolute inset-0 bg-black/5'></div>
                <div className='text-center z-10 px-4'>
                    <h1 className='text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg'>
                        Submit your Startup Pitch
                    </h1>
                    <p className='text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md'>
                        Share your innovative idea with the world and get the attention it deserves
                    </p>
                </div>
            </section>

            <section className='min-h-[50vh] bg-gradient-to-b from-gray-50 to-white py-12 px-4'>
                <StartupForm />
            </section>
        </>
    )
}

export default page