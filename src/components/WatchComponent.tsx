import { useSearch } from "@tanstack/react-router";
import React from "react";

const WatchComponent = () => {
	const { movie } = useSearch({ from: "/watch" });
	return (
		<React.Fragment>
			<h1 className='text-2xl font-bold mb-4 text-center'>
				Watching Movie: {movie}
			</h1>
			<video
				controls
				className='w-full h-full max-h-screen bg-black'
				src='https://www.w3schools.com/html/mov_bbb.mp4'
				poster='https://via.placeholder.com/800x450.png?text=Video+Poster'
				aria-label='Video player for selected movie'
				tabIndex={0}
			/>
		</React.Fragment>
	);
};

export default WatchComponent;
