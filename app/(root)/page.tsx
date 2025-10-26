import SearchForm from "../../components/SearchForm";
import StartupCard from "../../components/StartupCard";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;

  const posts = [{
    _createdAt: new Date(),
    views: 33,
    _id: 1,
    author: { _id: 1, name: 'Tarun' },
    description: 'Description',
    image: 'https://images.unsplash.com/photo-1624918215128-0f813a760633?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGUlMjBibGFua3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=700',
    category: 'Testing',
    title: 'Title'
  }]
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
    </>
  );
}
