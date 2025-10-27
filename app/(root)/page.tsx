import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupCardType } from "../../components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;

  const params = { search: query || null }

  const { data: posts } = await sanityFetch({query: STARTUPS_QUERY, params})

  return (
    <>
    <section className="flex flex-col gap-4 items-center justify-center h-[calc(100vh-16rem)] bg-fuchsia-300">
      <h1 className="text-3xl font-bold text-center">Pitch your startup, <br /> Connect with entrepreneurs</h1>
      <p className="text-lg text-center">Submit Ideas, Vote on pitches and get noticed in Virtual Competitions</p>
      <SearchForm query={query}/>
    </section>

    <section className="px-5 py-3">
      <p className="font-semibold text-2xl text-center">
        {query ? `Search results for "${query}"` : "All Startups"}
      </p>

      <ul className="grid md:grid-cols-3 sm:grid-cols-2 gap-5">
          {posts?.length > 0  ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post}/>
            ))
          ): (
            <p>No posts found</p>
          )}
      </ul>
    </section>

    <SanityLive />
    </>
  );
}
