import { Card } from "./ui/card";
import type { Movie } from "@/types/types";
const url =
	import.meta.env.VITE_TMDB_IMAGE_URL || "https://image.tmdb.org/t/p/w200";
interface MovieCardProps {
	movie: Movie;
	index?: number;
}
const MovieCard = ({ movie, index = 0 }: MovieCardProps) => {
	return (
		<Card className='group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl outline-blue-200 p-0 border-0 w-[7rem] h-[9.8rem] rounded-sm'>
			<img
				src={
					movie?.poster_path ?
						`${url}${movie?.poster_path}`
					:	"/placeholder.svg"
				}
				alt={movie.title}
				className='w-full h-full object-cover'
			/>
			<span className='movieNum'>
				{index !== undefined ? `${index + 1}` : "No.1"}
			</span>
		</Card>
	);
};

export default MovieCard;
