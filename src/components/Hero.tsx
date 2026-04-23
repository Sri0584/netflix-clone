import React, { useState } from "react";
import { preload } from "react-dom";
import poster640 from "@/assets/poster-640.webp";
import poster960 from "@/assets/poster-960.webp";
import poster1280 from "@/assets/poster-1280.webp";
import poster1920 from "@/assets/poster-1920.webp";
import useAuth from "@/store/useAuthStore";

const posterSrcSet = `${poster640} 640w, ${poster960} 960w, ${poster1280} 1280w, ${poster1920} 1920w`;

preload(poster1280, {
	as: "image",
	fetchPriority: "high",
	imageSrcSet: posterSrcSet,
	imageSizes: "100vw",
	type: "image/webp",
});

interface HeroProps {
	title?: string;
	description?: string;
	onPlayClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({
	title = "Unlimited movies, TV shows, and more.",
	description = "Watch anywhere. Cancel anytime.",
	onPlayClick,
}) => {
	const { signedIn } = useAuth();
	const [email, setEmail] = useState("");

	return (
		<section className='relative min-h-[80vh] md:h-screen w-full overflow-hidden bg-black'>
			<img
				src={poster1280}
				srcSet={posterSrcSet}
				sizes='100vw'
				width={1920}
				height={1080}
				alt='poster background'
				loading='eager'
				fetchPriority='high'
				className='absolute inset-0 w-full h-full object-cover'
			/>

			<div className='absolute inset-0 bg-black/60 pointer-events-none' />

			<div className='absolute inset-0 flex flex-col justify-center items-center p-8 md:p-12 text-white'>
				<h1 className='text-3xl md:text-5xl font-bold text-white mb-4 max-w-2xl text-center'>
					{title}
				</h1>
				<p className='text-sm md:text-lg text-gray-200 mb-6 max-w-xl line-clamp-3 text-center'>
					{description}
				</p>
				<div className='sm:px-1 px-0 w-full flex justify-center'>
					{signedIn ?
						<div className='flex flex-col md:flex-row gap-2 w-full max-w-md'>
							<input
								type='email'
								placeholder='Enter your email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className='flex-1 px-4 py-0 h-8 m-3 rounded text-white placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500'
							/>
							<button
								aria-label='Get Started button'
								className='bg-red-500 m-3 text-black sm:px-8 px-3 py-1 rounded font-semibold hover:bg-gray-300 transition'
							>
								Get Started
							</button>
						</div>
					:	<button
							onClick={onPlayClick}
							aria-label='Play button: Restart your membership'
							className='bg-red-500 m-3 text-black sm:px-3 px-8 py-2 rounded font-semibold hover:bg-gray-300 transition flex items-center gap-2'
						>
							Restart your membership
						</button>
					}
				</div>
			</div>
		</section>
	);
};

export default Hero;
