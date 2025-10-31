import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { auth, signOut, signIn } from '@/auth'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { LogOut, Rocket, Github } from 'lucide-react'

const Navbar = async() => {
  const session = await auth();
  return (
    <header className='font-work-sans px-4 sm:px-6 py-3 bg-white/80 backdrop-blur-md border-b border-yellow-100 shadow-sm sticky top-0 z-50'>
      <nav className='flex justify-between items-center max-w-7xl mx-auto'>
        
        <Link href="/" className='flex items-center gap-3 group'>
          <div className='relative'>
            <Image src="/logo.png" alt="Logo" width={60} height={60} className='group-hover:scale-105 transition-transform duration-300' />
            <div className="absolute -inset-1 bg-yellow-200 rounded-full blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10"></div>
          </div>
          <div className="hidden sm:block w-px h-6 bg-gradient-to-b from-yellow-200 to-amber-200"></div>
          
        </Link>

        <div className='flex items-center gap-4 sm:gap-6'>
          {session && session?.user ? (
            <>
              <Link href="/startup/create" className='flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 rounded-full font-semibold text-sm hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 shadow-sm hover:shadow-md group'>
                <Rocket size={16} className='group-hover:scale-110 transition-transform' />
                <span>Create Startup</span>
              </Link>
              <div className='flex items-center gap-3'>
                <form action={async () => {
                  "use server"
                  await signOut()
                }} className='hidden sm:block'>
                  <button type='submit' className='p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-all duration-300 group'>
                    <LogOut size={18} className='group-hover:scale-110 transition-transform cursor-pointer' />
                  </button>
                </form>
                <Link href={`/user/${session?.id}`} className='group'>
                  <div className='flex items-center gap-2 p-1 rounded-full hover:bg-yellow-50 transition-all duration-300'>
                    <Avatar className='border-2 border-yellow-200 group-hover:border-yellow-400 transition-colors duration-300'>
                      <AvatarImage src={session?.user?.image} className='group-hover:scale-105 transition-transform duration-300' />
                      <AvatarFallback className='bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-semibold'>
                        {session?.user?.name?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className='hidden md:block text-sm font-medium text-gray-700 max-w-24 truncate'>
                      {session?.user?.name}
                    </span>
                  </div>
                </Link>
                <form action={async () => {
                  "use server"
                  await signOut()
                }} className='sm:hidden'>
                  <button type='submit' className='p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-all duration-300'>
                    <LogOut size={18} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <form action={async () => {
              "use server"
              await signIn('github')
            }}>
              <button type='submit' className='flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm shadow-sm hover:shadow-md'>
                <span className='flex items-center gap-1 cursor-pointer'>Login <Github size={16} /></span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar