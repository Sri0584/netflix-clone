import { useNavigate } from "@tanstack/react-router";
import { Card } from "./ui/card";
import type { Movie } from "@/types/types";

const url = import.meta.env.VITE_TMDB_IMAGES_ASSET_URL;

interface MovieCardProps {
	movie: Movie;
	index?: number;
}

const MovieCard = ({ movie, index = 0 }: MovieCardProps) => {
	const navigate = useNavigate();

	const handleMovieClick = () => {
		// Placeholder for movie click handling logic

		void navigate({
			to: "/watch",
			search: {
				movie: movie.title,
			},
		});
	};
	return (
		<button
			aria-label={`${movie.title}, movie #${(index + 1).toString()}`}
			className='relative w-[7rem] h-[9.8rem] rounded-sm overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
			onClick={handleMovieClick}
		>
			<Card className='group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl outline-blue-200 p-0 border-0 w-[7rem] h-[9.8rem] rounded-sm'>
				<img
					src={
						movie.poster_path ?
							`${url}${movie.poster_path}`
						:	"/placeholder.svg"
					}
					alt={movie.title}
					className='w-full h-full object-cover'
					loading='lazy'
					width={300}
					height={450}
				/>
				<span className='movieNum'>{(index + 1).toString()}</span>
			</Card>
		</button>
	);
};

export default MovieCard;
