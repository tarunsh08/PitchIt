"use client"

import { X } from "lucide-react"
import Link from "next/link"

const SearchFormReset = () => {
    const reset = () => {
        const form = document.querySelector('form')
        if (form) {
            form.reset()
        }
    }
    return (
        <button type='reset' onClick={reset}>
            <Link href="/" className="bg-gray-200 flex text-gray-600 p-3 rounded-full hover:bg-gray-300 transition-colors">
                <X size={16} />
            </Link>
        </button>
    )
}

export default SearchFormReset