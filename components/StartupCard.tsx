import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Author, Startup } from '@/sanity/types'

export type StartupCardType = Omit<Startup, "author"> & { author?: Author }

const StartupCard = ({post}: {post: StartupCardType}) => {
    const { _createdAt, views, _id, author, description, image, category, title } = post
    
  return (
    <li className='border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white overflow-hidden group py-3 hover:border-yellow-200'>
      {/* Header with date and views */}
      <div className='flex justify-between items-center px-5 pt-3 pb-2'>
        <p className='text-xs text-gray-500 font-medium bg-yellow-50 px-2 py-1 rounded-full'>
          {formatDate(_createdAt)}
        </p>
        <div className='flex items-center gap-1.5 text-gray-500 bg-gray-50 px-2 py-1 rounded-full'>
          <EyeIcon size={14} className='text-red-400'/>
          <p className='text-xs font-medium'>{views}</p>
        </div>
      </div>

      {/* Author and Title */}
      <div className='flex justify-between items-start px-5 py-3'>
        <div className='flex-1 min-w-0'>
          <Link href={`/user/${author?._id}`} className='hover:underline'>
            <p className='text-sm font-medium text-gray-700 truncate'>{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className='font-bold text-lg text-gray-900 mt-1 line-clamp-2 group-hover:text-yellow-600 transition-colors'>
              {title}
            </h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`} className='flex-shrink-0 ml-3'>
          <img 
            src={author?.image} 
            alt="Author avatar" 
            width={48} 
            height={48} 
            className='rounded-full border-2 border-gray-100 hover:border-yellow-300 transition-colors'
          />
        </Link>
      </div>

      {/* Description and Image */}
      <Link href={`/startup/${_id}`} className='block'>
        <div className='px-5 pb-3'>
          <p className='text-gray-600 text-sm line-clamp-3 mb-3 leading-relaxed'>
            {description}
          </p>
        </div>
        <div className='relative h-48 w-full overflow-hidden bg-gray-50'>
          <img
            src={image} 
            alt={title}
            className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-300'
          />
        </div>
      </Link>

      {/* Footer with category and button */}
      <div className='flex justify-between items-center px-5 pt-4'>
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className='text-xs font-medium text-gray-500 hover:text-yellow-600 transition-colors bg-gray-50 px-3 py-1.5 rounded-full'>
            {category}
          </p>
        </Link>
        <Button className='px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 text-sm rounded-full shadow-sm'>
            <Link href={`/startup/${_id}`}>View Details</Link>
        </Button>
      </div>
    </li>
  )
}

export default StartupCard