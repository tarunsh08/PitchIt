import { auth } from '@/auth';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const session = await auth();
    
    const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
    
    if(!user) return notFound();
  return (
    <>
    <section>
        <div className='bg-black flex justify-center items-center lg:w-[60%] sm:w[70%] mx-auto py-5 my-4 rounded-3xl'>
            <div>
                <h3>{user.name}</h3>
            </div>
        </div>
    </section>
    </>
  )
}

export default page