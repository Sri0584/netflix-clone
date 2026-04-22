import React, { Suspense } from "react";
import "./App.css";
import Hero from "./components/Hero";
import useFetch from "./hooks/useFetch";
const TrendingNow = React.lazy(() => import("./components/TrendingNow"));
function App() {
	const { movies, error, loading } = useFetch({
		deferUntilIdle: true,
	});

	if (error) return <div>Error: {error}</div>;

	return (
		<main>
			<div className='min-h-screen bg-background text-foreground transition-colors duration-300'>
				<Hero />
				{loading ?
					<div
						role='status'
						className='px-6 mt-6 py-12 text-center text-gray-400'
					>
						<div className='inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-600 border-t-red-500'></div>
						<p className='mt-4'>Loading movies...</p>
					</div>
				: movies.length > 0 ?
					<Suspense fallback={null}>
						<TrendingNow movies={movies} />
					</Suspense>
				:	<div className='px-6 mt-6 text-gray-400'>No movies found.</div>}
			</div>
		</main>
	);
}

export default App;
