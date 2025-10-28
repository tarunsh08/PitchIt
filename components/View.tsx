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
    <div className='bg-pink-300 p-2 rounded-lg fixed bottom-4 right-4 w-[90px] h-[40px]'>
        <div className='absolute -top-1 -right-1'>
            <Ping/>
        </div>
        <p className='text-sm font-semibold text-center'>
            <span>{totalViews} view{totalViews === 1 ? '' : 's'}</span>
        </p>
    </div>
  )
}

export default View