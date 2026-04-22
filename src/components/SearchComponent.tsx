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
		<div className='container relative mx-auto mt-6 max-w-6xl px-6'>
			<h2 className='text-3xl font-bold'>Search Results for "{movie}"</h2>
			<div
				className='sr-only'
				role='status'
				aria-atomic='true'
				aria-live='polite'
			>
				{results.length > 0 ?
					`Search results for: ${movie} are ${results.length} movies.`
				:	"No results found"}
			</div>
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
