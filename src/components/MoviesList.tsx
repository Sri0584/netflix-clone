import type { Movie, MovieListProps } from "../types/types";
import MovieCard from "./MovieCard";

const MoviesList = ({ movies }: MovieListProps) => {
	return (
		<div className='relative'>
			<ul
				className='inline-flex space-x-4 px-4 md:px-6 py-4 relative'
				aria-label='Movie list'
			>
				{movies.map((movie: Movie, index: number) => (
					<li key={movie.id} className='flex-none'>
						<MovieCard movie={movie} index={index} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default MoviesList;
