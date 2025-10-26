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
            <Link href="/" className="bg-black flex text-white p-3 rounded-full">
                <X />
            </Link>
        </button>
    )
}

export default SearchFormReset