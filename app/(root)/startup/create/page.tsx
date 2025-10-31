import { auth } from '@/auth'
import StartupForm from '@/components/StartupForm'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {
    const session = await auth()

    if(!session) redirect('/')
        
    return (
        <>
            <section className='bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-400 h-[50vh] flex items-center justify-center relative overflow-hidden'>
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-300 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-300 rounded-full blur-3xl opacity-40"></div>
                
                <div className='text-center z-10 px-4 max-w-4xl'>
                    <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg'>
                        Pitch Your <span className='text-gray-900'>Startup</span>
                    </h1>
                    <p className='text-lg md:text-xl text-white/95 max-w-2xl mx-auto drop-shadow-md leading-relaxed'>
                        Share your innovative idea with entrepreneurs and get the attention it deserves
                    </p>
                </div>
            </section>

            <section className='min-h-[50vh] bg-gradient-to-b from-yellow-50 to-white py-12 px-4'>
                <StartupForm />
            </section>
        </>
    )
}

export default page