import type { Movie } from "@/types/types";
import MoviesList from "./MoviesList";

const TrendingNow = ({ movies }: { movies: Movie[] }) => {
	return (
		<div className='px-6 mt-6'>
			<h2>Trending Now</h2>
			{movies.length > 0 ?
				<MoviesList movies={movies} />
			:	<div>No movies found!</div>}
		</div>
	);
};

export default TrendingNow;
