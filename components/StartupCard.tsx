import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity/types'

export type StartupCardType = Omit<Startup, "author"> & { author?: Author }

const StartupCard = ({post}: {post: StartupCardType}) => {
    const { _createdAt, views, _id, author, description, image, category, title } = post
    
  return (
    <li className='border-3 border-gray-200 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-white hover:bg-fuchsia-100 overflow-hidden group py-2'>
      <div className='flex justify-between items-center px-4 pt-4 pb-2'>
        <p className='text-sm text-gray-500 font-medium'>
          {formatDate(_createdAt)}
        </p>
        <div className='flex items-center gap-1.5 text-gray-500'>
          <EyeIcon size={16} color='red'/>
          <p className='text-sm font-medium'>{views}</p>
        </div>
      </div>

      <div className='flex justify-between items-start px-4 py-3'>
        <div className='flex-1 min-w-0'>
          <Link href={`/user/${author?._id}`} className='hover:underline'>
            <p className='text-sm font-medium text-gray-700 truncate'>{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className='font-bold text-lg text-gray-900 mt-1 line-clamp-2 group-hover:text-blue-600 transition-colors'>
              {title}
            </h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`} className='flex-shrink-0 ml-3'>
          <Image 
            src="https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.webp?a=1&b=1&s=612x612&w=0&k=20&c=vvEVV677FisNADAhIEzuZk8fE-est4lcWjgzfCB4hcM=" 
            alt="Author avatar" 
            width={48} 
            height={48} 
            className='rounded-full border-2 border-gray-100 hover:border-blue-300 transition-colors'
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`} className='block'>
        <div className='px-4 pb-3'>
          <p className='text-gray-600 text-sm line-clamp-3 mb-3 leading-relaxed'>
            {description}
          </p>
        </div>
        <div className='relative h-48 w-full overflow-hidden'>
          <img
            src={image} 
            alt={title}
            className='object-cover group-hover:scale-105 transition-transform duration-300'
          />
        </div>
      </Link>
      <div className='flex justify-center items-center gap-3 mt-5'>
        <Link href={`/?query=${category?.toLowerCase()}`}>
        <p className='text-sm font-medium text-gray-500 hover:underline'>
          {category}
        </p>
        </Link>
        <Button className='px-2 py-0.5 bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors'>
            <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  )
}

export default StartupCard