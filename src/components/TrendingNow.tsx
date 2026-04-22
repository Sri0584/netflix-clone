import type { Movie } from "@/types/types";
import MoviesList from "./MoviesList";

const TrendingNow = ({ movies }: { movies: Movie[] }) => {
	return (
		<div className='px-6 mt-6'>
			<h1>Trending Now</h1>
			{movies.length > 0 ?
				<MoviesList movies={movies} />
			:	<div>No movies found!</div>}
		</div>
	);
};

export default TrendingNow;
