import React from 'react'
import Form from 'next/form'
import SearchFormReset from './SearchFormReset'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SearchForm = ({ query }: { query?: string }) => {

  return (
    <Form action="/" scroll={false} className='flex items-center gap-2 bg-white border-2 border-gray-200 rounded-2xl px-6 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-md'>
        <input
        name='query'
        defaultValue={query}
        className='border-none focus:outline-none w-full bg-transparent placeholder-gray-400'
        placeholder='Search Startups...'
        />
        <div className='flex gap-2'>
            {query && (
                <SearchFormReset />
            )}
            <Button type='submit' className='bg-gradient-to-r from-yellow-400 to-amber-500 text-white p-3 rounded-full hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 shadow-md'>
                <Search size={20}/>
            </Button>
        </div>
    </Form>
  )
}

export default SearchForm