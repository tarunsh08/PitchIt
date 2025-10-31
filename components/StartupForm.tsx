"use client"

import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import MdEditor from '@uiw/react-md-editor'
import { Button } from './ui/button'
import { formSchema } from '@/lib/validation'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { createPitch } from '@/lib/actions'
import { AirplayIcon } from 'lucide-react'

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [pitch, setPitch] = useState("")
    const router = useRouter();

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            }
            await formSchema.parseAsync(formValues)

            const result = await createPitch(prevState, formData, pitch)
            if(result.status === "SUCCESS"){
                router.push(`/startup/${result._id}`)
            }
            return result;
        } catch (error) {
            if(error instanceof z.ZodError){
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors as Record<string, string>)
                return { ...prevState, error: "Validation failed", status: "ERROR" }
            }
            return { ...prevState, error: "An unexpected error occurred", status: "ERROR" }
        }
    }

    const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: "", status: "INITIAL" })

    return (
        <form
            action={formAction}
            className='flex flex-col items-center justify-start gap-8 border border-yellow-200 bg-white p-6 sm:p-8 rounded-2xl shadow-lg lg:w-[60%] md:w-[75%] sm:w-[90%] w-full mx-auto my-8 sm:my-12'
        >
            {/* Title Field */}
            <div className='flex flex-col items-start justify-start gap-3 w-full'>
                <label htmlFor="title" className='font-semibold text-base text-gray-800 flex items-center gap-2'>
                    <div className='w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full'></div>
                    Title
                </label>
                <Input
                    id="title"
                    name='title'
                    type="text"
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all duration-300 bg-white'
                    required
                    placeholder='Startup Title'
                />
                {errors.title && <p className='text-red-500 text-sm font-medium mt-1'>{errors.title}</p>}
            </div>

            {/* Description Field */}
            <div className='flex flex-col items-start justify-start gap-3 w-full'>
                <label htmlFor="description" className='font-semibold text-base text-gray-800 flex items-center gap-2'>
                    <div className='w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full'></div>
                    Description
                </label>
                <Textarea
                    id="description"
                    name='description'
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all duration-300 min-h-[100px] resize-vertical bg-white'
                    required
                    placeholder='Brief description of your startup...'
                />
                {errors.description && <p className='text-red-500 text-sm font-medium mt-1'>{errors.description}</p>}
            </div>

            {/* Category Field */}
            <div className='flex flex-col items-start justify-start gap-3 w-full'>
                <label htmlFor="category" className='font-semibold text-base text-gray-800 flex items-center gap-2'>
                    <div className='w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full'></div>
                    Category
                </label>
                <Input
                    id="category"
                    name='category'
                    type="text"
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all duration-300 bg-white'
                    required
                    placeholder='Tech, Business, Health, Education...'
                />
                {errors.category && <p className='text-red-500 text-sm font-medium mt-1'>{errors.category}</p>}
            </div>

            {/* Image URL Field */}
            <div className='flex flex-col items-start justify-start gap-3 w-full'>
                <label htmlFor="link" className='font-semibold text-base text-gray-800 flex items-center gap-2'>
                    <div className='w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full'></div>
                    Image URL
                </label>
                <Input
                    id="link"
                    name='link'
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all duration-300 bg-white'
                    required
                    placeholder='https://example.com/your-startup-image.jpg'
                />
                {errors.link && <p className='text-red-500 text-sm font-medium mt-1'>{errors.link}</p>}
            </div>

            {/* Pitch Editor */}
            <div className='flex flex-col items-start justify-start gap-3 w-full' data-color-mode="light">
                <label htmlFor="pitch" className='font-semibold text-base text-gray-800 flex items-center gap-2'>
                    <div className='w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full'></div>
                    Pitch Details
                </label>
                <div className='w-full border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-100 transition-all duration-300'>
                    <MdEditor
                        value={pitch}
                        onChange={(value) => setPitch(value as string)}
                        id='pitch'
                        preview='edit'
                        height={300}
                        textareaProps={{
                            placeholder: "Describe your idea, the problem it solves, your target market, and what makes it unique..."
                        }}
                    />
                </div>
                {errors.pitch && <p className='text-red-500 text-sm font-medium mt-1'>{errors.pitch}</p>}
            </div>

            <Button
                type='submit'
                className='w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white cursor-pointer text-lg font-semibold px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={isPending}
            >
                {isPending ? (
                    <div className='flex items-center gap-3'>
                        <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                        Submitting Your Pitch...
                    </div>
                ) : (
                    <div className='flex items-center gap-2'>
                        <span><AirplayIcon/></span>
                        Launch Your Startup
                    </div>
                )}
            </Button>

            {state.error && state.status === "ERROR" && (
                <div className='w-full p-4 bg-red-50 border border-red-200 rounded-xl'>
                    <p className='text-red-600 text-sm font-medium text-center'>{state.error}</p>
                </div>
            )}
        </form>
    )
}

export default StartupForm