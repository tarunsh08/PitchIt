import SearchForm from "../components/SearchForm";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;
  return (
    <section className="flex flex-col gap-4 items-center justify-center h-[calc(100vh-16rem)] bg-fuchsia-300">
      <h1 className="text-3xl font-bold text-center">Pitch your startup, <br /> Connect with entrepreneurs</h1>
      <p className="text-lg text-center">Submit Ideas, Vote on pitches and get noticed in Virtual Competitions</p>
      <SearchForm query={query}/>
    </section>
  );
}
