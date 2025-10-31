import { auth } from '@/auth';
import UserStartups from '@/components/UserStartups';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  if (!user) return notFound();
  return (
    <>
      <section className="w-full">
        <div className='bg-yellow-400 flex flex-col justify-center items-center w-[90%] sm:w-[80%] md:w-[75%] lg:w-[60%] mx-auto py-4 sm:py-5 my-4 sm:my-6 rounded-2xl sm:rounded-3xl border-4 sm:border-5 border-black'>
          <div className='bg-black w-[95%] sm:w-[90%] py-3 sm:py-4 md:py-5 rounded-2xl sm:rounded-3xl transform rotate-[-6deg] sm:rotate-[-8deg] -mt-4 sm:-mt-6'>
            <h3 className='bg-white border-3 sm:border-4 md:border-5 border-black transform rotate-[6deg] sm:rotate-[8deg] w-[80%] sm:w-[70%] md:w-[60%] mx-auto py-2 sm:py-3 px-3 sm:px-4 rounded-2xl sm:rounded-3xl text-center font-bold text-lg sm:text-xl md:text-2xl'>
              {user.name}
            </h3>
          </div>

          <div className='mt-4 sm:mt-6 md:mt-8 -mb-4 sm:-mb-6'>
            <Image 
              src={user.image}
              alt={user.name}
              width={160}
              height={160}
              className='rounded-full border-3 sm:border-4 border-black w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52'
            />
          </div>

          <div className='text-center mt-6 sm:mt-8 md:mt-10 px-4 sm:px-6'>
            <p className='text-white font-bold text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3'>
              @{user.username}
            </p>
            <p className='text-white font-semibold text-sm sm:text-base md:text-lg leading-relaxed'>
              {user?.bio}
            </p>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center w-full mt-8 sm:mt-12 px-4 sm:px-6'>
          <p className='text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8'>
            {session?.id === id ? "Your" : "All"} Startups
          </p>

          <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl gap-4 sm:gap-6'>
              <UserStartups id={id}/>
          </ul>
        </div>
      </section>
    </>
  )
}

export default page