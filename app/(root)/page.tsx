import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupCardType } from "../../components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;

  const params = { search: query || null }

  const session = await auth()

  const { data: posts } = await sanityFetch({query: STARTUPS_QUERY, params})

  return (
    <>
    <section className="flex flex-col gap-6 items-center justify-center h-[calc(100vh-16rem)] bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-100 px-4">
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
          Pitch your startup, <br /> 
          <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Connect with entrepreneurs
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Submit Ideas, Vote on pitches and get noticed in Virtual Competitions
        </p>
      </div>
      <SearchForm query={query}/>
      
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-yellow-200 rounded-full blur-xl opacity-60"></div>
      <div className="absolute top-20 right-10 w-16 h-16 bg-amber-200 rounded-full blur-xl opacity-40"></div>
    </section>

    <section className="px-4 sm:px-6 py-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <p className="font-semibold text-2xl text-center mb-8 text-gray-900">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts?.length > 0  ? (
              posts.map((post: StartupCardType) => (
                <StartupCard key={post?._id} post={post}/>
              ))
            ): (
              <p className="text-gray-500 text-center col-span-full">No posts found</p>
            )}
        </ul>
      </div>
    </section>

    <SanityLive />
    </>
  );
}