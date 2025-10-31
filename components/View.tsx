import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write-client'
import { after } from 'next/server'

const View = async ({id}: {id: string}) => {
    const { views: totalViews } = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, { id })

    after(async() => await writeClient.patch(id).set({ views: totalViews + 1 }).commit())
    console.log(totalViews)
    
  return (
    <div className='bg-gradient-to-br from-yellow-100 to-amber-100 p-3 rounded-2xl fixed bottom-6 right-6 w-[110px] h-[48px] border border-yellow-200 shadow-lg backdrop-blur-sm'>
        <div className='absolute -top-1 -right-1'>
            <Ping/>
        </div>
        <div className='flex items-center justify-center gap-1.5'>
            <div className='w-2 h-2 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full'></div>
            <p className='text-sm font-semibold text-gray-700 text-center'>
                <span className='font-bold text-amber-600'>{totalViews}</span> view{totalViews === 1 ? '' : 's'}
            </p>
        </div>
    </div>
  )
}

export default View