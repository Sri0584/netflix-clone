import MovieCard from "@/components/MovieCard";
import useSearchMovies from "@/store/apiStore";
import { useSearch } from "@tanstack/react-router";
import { useEffect } from "react";

export default function SearchComponent() {
	const { movie } = useSearch({ from: "/search" });
	const { results, performSearch } = useSearchMovies();

	useEffect(() => {
		if (movie) {
			performSearch(movie);
		}
	}, [movie, performSearch]);

	return (
		<div className='min-h-screen bg-background text-foreground transition-colors duration-300 flex items-center justify-center flex-col p-8'>
			<h1 className='text-3xl font-bold'>Search Page</h1>
			{results.length > 0 ?
				<div className='mt-8 p-8 grid grid-cols-fluid gap-6'>
					{results.map((movie, index) => (
						<MovieCard key={movie.id} movie={movie} index={index} />
					))}
				</div>
			:	"No results found"}
		</div>
	);
}
