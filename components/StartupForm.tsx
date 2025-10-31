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
                const fieldErrors: z.ZodError = error.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>)

                return { ...prevState, error: "Validation failed", status: "ERROR" }
            }
            return { ...prevState, error: "An unexpected error occurred", status: "ERROR" }
        }
    }

    const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: "", status: "INITIAL" })


    return (
        <form
            action={formAction}
            className='flex flex-col items-center justify-start gap-8 border border-gray-200 bg-white p-8 rounded-2xl shadow-lg lg:w-[60%] sm:w-[70%] mx-auto my-12'
        >
            <div className='flex flex-col items-start justify-start gap-3 w-full'>
                <label htmlFor="title" className='font-semibold text-base text-gray-800'>Title</label>
                <Input
                    id="title"
                    name='title'
                    type="text"
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300'
                    required
                    placeholder='Startup Title'
                />
                {errors.title && <p className='text-red-500 text-sm font-medium mt-1'>{errors.title}</p>}
            </div>

            <div className='flex flex-col items-start justify-start gap-3 w-full'>
                <label htmlFor="description" className='font-semibold text-base text-gray-800'>Description</label>
                <Textarea
                    id="description"
                    name='description'
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 min-h-[100px] resize-vertical'
                    required
                    placeholder='Startup Description'
                />
                {errors.description && <p className='text-red-500 text-sm font-medium mt-1'>{errors.description}</p>}
            </div>

            <div className='flex flex-col items-start justify-start gap-3 w-full'>
                <label htmlFor="category" className='font-semibold text-base text-gray-800'>Category</label>
                <Input
                    id="category"
                    name='category'
                    type="text"
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300'
                    required
                    placeholder='Startup Category (e.g. Tech, Business, etc.)'
                />
                {errors.category && <p className='text-red-500 text-sm font-medium mt-1'>{errors.category}</p>}
            </div>

            <div className='flex flex-col items-start justify-start gap-3 w-full'>
                <label htmlFor="link" className='font-semibold text-base text-gray-800'>Image URL</label>
                <Input
                    id="link"
                    name='link'
                    className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300'
                    required
                    placeholder='Startup Image URL'
                />
                {errors.link && <p className='text-red-500 text-sm font-medium mt-1'>{errors.link}</p>}
            </div>

            <div className='flex flex-col items-start justify-start gap-3 w-full' data-color-mode="light">
                <label htmlFor="pitch" className='font-semibold text-base text-gray-800'>Pitch</label>
                <div className='w-full border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-200 transition-all duration-300'>
                    <MdEditor
                        value={pitch}
                        onChange={(value) => setPitch(value as string)}
                        id='pitch'
                        preview='edit'
                        height={300}
                        textareaProps={{
                            placeholder: "Briefly describe your idea and what problem it solves..."
                        }}
                    />
                </div>
                {errors.pitch && <p className='text-red-500 text-sm font-medium mt-1'>{errors.pitch}</p>}
            </div>

            <Button
                type='submit'
                className='w-full bg-pink-600 hover:bg-pink-700 text-white cursor-pointer text-xl font-semibold px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                disabled={isPending}
            >
                {isPending ? (
                    <div className='flex items-center gap-2'>
                        <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                        Submitting...
                    </div>
                ) : (
                    "Submit your pitch"
                )}
            </Button>
        </form>
    )
}

export default StartupForm