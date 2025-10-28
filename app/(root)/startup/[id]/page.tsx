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
            {/* Hero Section */}
            <section className='flex flex-col gap-6 items-center justify-center h-[70vh] bg-gradient-to-br from-fuchsia-300 via-purple-300 to-pink-300 px-4'>
                <span className='bg-black/80 text-white px-6 py-2 rounded-full text-sm font-medium backdrop-blur-sm'>
                    {formatDate(post._createdAt)}
                </span>
                <h1 className='text-center font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 max-w-4xl leading-tight'>
                    {post.title}
                </h1>
                <p className='text-center text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed'>
                    {post.description}
                </p>
            </section>

            {/* Content Section */}
            <section className='py-16 px-4 bg-white'>
                <div className='max-w-6xl mx-auto'>
                    {/* Image */}
                    <div className='flex justify-center mb-12'>
                        <div className='relative w-full max-w-4xl h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl'>
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className='object-cover'
                            />
                        </div>
                    </div>

                    {/* Author and Content */}
                    <div className='max-w-4xl mx-auto'>
                        {/* Author Info and Category */}
                        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 p-6 bg-gray-50 rounded-2xl border border-gray-200'>
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
                                        className='rounded-full border-2 border-white shadow-lg group-hover:scale-105 transition-transform'
                                    />
                                </div>
                                <div>
                                    <p className='font-semibold text-lg text-gray-900 group-hover:text-purple-600 transition-colors'>
                                        {post.author?.name}
                                    </p>
                                    <p className='text-gray-600'>@{post.author?.username}</p>
                                </div>
                            </Link>
                            
                            <div className='flex items-center gap-4'>
                                <span className='bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold text-sm border border-purple-200'>
                                    {post.category}
                                </span>
                            </div>
                        </div>

                        {/* Pitch Content */}
                        <div className='space-y-8'>
                            <h3 className='text-3xl font-bold text-gray-900 border-b border-gray-200 pb-4'>
                                Pitch Details
                            </h3>
                            
                            {parsedContent ? (
                                <article 
                                    className='prose prose-lg max-w-none 
                                        prose-headings:text-gray-900
                                        prose-p:text-gray-700 prose-p:leading-relaxed
                                        prose-strong:text-gray-900
                                        prose-em:text-gray-600
                                        prose-ul:text-gray-700
                                        prose-ol:text-gray-700
                                        prose-li:text-gray-700
                                        prose-blockquote:border-purple-300 prose-blockquote:bg-purple-50
                                        prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline
                                        prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                                        prose-pre:bg-gray-900 prose-pre:text-gray-100'
                                    dangerouslySetInnerHTML={{ __html: parsedContent }} 
                                />
                            ) : (
                                <div className='text-center py-12 bg-gray-50 rounded-2xl border border-gray-200'>
                                    <p className='text-gray-500 text-lg'>No pitch content available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <hr />
                {/* Todo: editor selected startups */}

                <Suspense fallback={<Skeleton className="h-[200px]" />}>
                    <View id={id}/>
                </Suspense>
            </section>
        </>
    )
}

export default page