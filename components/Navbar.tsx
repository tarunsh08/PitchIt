import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { auth, signOut, signIn } from '@/auth'

const Navbar = async() => {
  const session = await auth();
  return (
    <header className='font-work-sans px-5 py-3 bg-white shadow-sm'>
      <nav className='flex justify-between items-center'>
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={80} height={80} />
        </Link>
        <div className='flex items-center gap-5 text-black'>
          {session && session?.user ? (
            <>
            <Link href="/startup/create">
            <span>
              Create Startup
            </span>
            </Link>
            <button onClick={async() => {
              "use server"
              await signOut()
              }}>
              <span>Logout</span>
            </button>
            <Link href={`/user/${session?.id}`}>
            <span>{session?.user?.name}</span>
            </Link>
            </>
          ) : (
            <button onClick={async() => {
              "use server"
              await signIn('github')
              }}>
              <span>Login</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar