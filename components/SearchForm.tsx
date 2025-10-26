import React from 'react'
import Form from 'next/form'
import SearchFormReset from './SearchFormReset'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SearchForm = ({ query }: { query?: string }) => {

  return (
    <Form action="/" scroll={false} className='flex items-center gap-2 border border-gray-300 rounded-2xl px-5 py-3 text-lg font-semibold'>
        <input
        name='query'
        defaultValue={query}
        className='border-none focus:outline-none'
        placeholder='Search Startups'
        />
        <div className='flex gap-2'>
            {query && (
                <SearchFormReset />
            )}
            <Button type='submit' className='bg-black text-white p-3 rounded-full'>
                <Search size={20}/>
            </Button>
        </div>
    </Form>
  )
}

export default SearchForm