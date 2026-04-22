import "./App.css";
import Hero from "./components/Hero";
import TrendingNow from "./components/TrendingNow";
import useFetch from "./hooks/useFetch";

function App() {
	const { movies, error, loading } = useFetch();

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;
	if (!movies) return <div>No movies found.</div>;
	return (
		<main>
			<div className='min-h-screen bg-background text-foreground transition-colors duration-300'>
				<Hero />
				<TrendingNow movies={movies} />
			</div>
		</main>
	);
}

export default App;
