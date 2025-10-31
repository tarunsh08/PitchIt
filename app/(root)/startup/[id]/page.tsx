import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';

const md = markdownit();

const page = async({ params }: { params: Promise<{ id: string }>}) => {
    const id = (await params).id;
    const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
    if (!post) return notFound();

    const parsedContent = md.render(post?.pitch || '')

    return (
        <>
            <section className='flex flex-col gap-6 items-center justify-center h-[70vh] bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 px-4 relative overflow-hidden'>
                <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-40"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-amber-200 rounded-full blur-3xl opacity-30"></div>
                
                <span className='bg-black/90 text-white px-6 py-2 rounded-full text-sm font-medium backdrop-blur-sm z-10 border border-yellow-200/20'>
                    {formatDate(post._createdAt)}
                </span>
                <h1 className='text-center font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 max-w-4xl leading-tight z-10'>
                    {post.title}
                </h1>
                <p className='text-center text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed z-10'>
                    {post.description}
                </p>
                
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
                    </div>
                </div>
            </section>

            <section className='py-16 px-4 bg-white'>
                <div className='max-w-6xl mx-auto'>
                    <div className='flex justify-center mb-12'>
                        <div className='relative w-full max-w-4xl h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg border border-yellow-100'>
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className='object-cover hover:scale-105 transition-transform duration-700'
                                priority
                            />
                        </div>
                    </div>

                    <div className='max-w-4xl mx-auto'>
                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl border border-yellow-200 shadow-sm'>
                            <Link 
                                href={`/user/${post.author?._id}`}
                                className='flex items-center gap-4 group flex-1'
                            >
                                <div className='relative'>
                                    <Image 
                                        src={post.author?.image || '/placeholder-avatar.png'} 
                                        alt={post.author?.name || 'Author'} 
                                        width={60} 
                                        height={60} 
                                        className='rounded-full border-2 border-white shadow-lg group-hover:scale-105 transition-transform duration-300'
                                    />
                                    <div className="absolute -inset-1 bg-yellow-300 rounded-full blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
                                </div>
                                <div>
                                    <p className='font-semibold text-lg text-gray-900 group-hover:text-amber-600 transition-colors'>
                                        {post.author?.name}
                                    </p>
                                    <p className='text-gray-600'>@{post.author?.username}</p>
                                </div>
                            </Link>
                            
                            <div className='flex items-center gap-4'>
                                <span className='bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 rounded-full font-semibold text-sm border border-yellow-300 shadow-sm'>
                                    {post.category}
                                </span>
                            </div>
                        </div>

                        <div className='space-y-8'>
                            <div className='flex items-center gap-4 border-b border-gray-200 pb-4'>
                                <div className='w-2 h-8 bg-gradient-to-b from-yellow-400 to-amber-500 rounded-full'></div>
                                <h3 className='text-3xl font-bold text-gray-900'>
                                    Pitch Details
                                </h3>
                            </div>
                            
                            {parsedContent ? (
                                <article 
                                    className='prose prose-lg max-w-none 
                                        prose-headings:text-gray-900 prose-headings:border-b prose-headings:pb-2 prose-headings:border-yellow-100
                                        prose-p:text-gray-700 prose-p:leading-relaxed
                                        prose-strong:text-gray-900 prose-strong:bg-yellow-50 prose-strong:px-1 prose-strong:rounded
                                        prose-em:text-gray-600
                                        prose-ul:text-gray-700
                                        prose-ol:text-gray-700
                                        prose-li:text-gray-700
                                        prose-blockquote:border-yellow-300 prose-blockquote:bg-yellow-50 prose-blockquote:rounded-xl prose-blockquote:px-6
                                        prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-amber-700
                                        prose-code:bg-yellow-100 prose-code:text-amber-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-medium
                                        prose-pre:bg-gradient-to-br prose-pre:from-gray-900 prose-pre:to-gray-800 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:border prose-pre:border-yellow-200/20'
                                    dangerouslySetInnerHTML={{ __html: parsedContent }} 
                                />
                            ) : (
                                <div className='text-center py-12 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border border-yellow-200'>
                                    <div className="w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">📝</span>
                                    </div>
                                    <p className='text-gray-600 text-lg'>No pitch content available yet</p>
                                    <p className='text-gray-500 text-sm mt-2'>Check back later for updates</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto my-16">
                    <div className="h-px bg-gradient-to-r from-transparent via-yellow-200 to-transparent"></div>
                </div>

                <Suspense fallback={
                    <div className="max-w-4xl mx-auto">
                        <Skeleton className="h-8 w-48 rounded-lg" />
                    </div>
                }>
                    <View id={id}/>
                </Suspense>
            </section>
        </>
    )
}

export default page