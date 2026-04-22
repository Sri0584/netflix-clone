import React from "react";
import heroBg from "../assets/hero-background.jpg";

interface HeroProps {
	title?: string;
	description?: string;
	backgroundImage?: string;
	onPlayClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({
	title = "Unlimited movies, TV shows, and more.",
	description = "Watch anywhere. Cancel anytime.",
	backgroundImage = heroBg,
	onPlayClick,
}) => {
	return (
		<section className='relative min-h-[80vh] md:h-screen w-full overflow-hidden rounded-lg mb-8 bg-gradient-to-br from-black via-gray-900 to-black'>
			<img
				loading='lazy'
				src={backgroundImage}
				alt='Netflix streaming service hero background'
				width={1920}
				height={1080}
				className='absolute inset-0 w-full h-full object-cover'
			/>
			{/* Dark overlay */}
			<div className='absolute inset-0 bg-gradient-to-br from-black/95 via-black/70 to-black/95 pointer-events-none'></div>

			{/* Content */}
			<div className='absolute inset-0 flex flex-col justify-center items-center p-8 md:p-12 text-white'>
				<h1 className='text-3xl md:text-5xl font-bold text-white mb-4 max-w-2xl'>
					{title}
				</h1>
				<p className='text-sm md:text-lg text-gray-200 mb-6 max-w-xl line-clamp-3'>
					{description}
				</p>
				<div className='sm:px-3 px-0 w-full flex justify-center'>
					<button
						onClick={onPlayClick}
						aria-label='Play button: Restart your membership'
						className='bg-red-500 m-3 text-black sm:px-3 px-8 py-2 rounded font-semibold hover:bg-gray-300 transition flex items-center gap-2'
					>
						Restart your membership
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-5 h-5'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6.633 10.5c3.806 0 7.308-2.693 7.308-6S10.439 1.5 6.633 1.5c-3.695 0-7.308 2.693-7.308 6s3.612 6 7.308 6zM9.75 21c0 .621-.504 1.125-1.125 1.125h-3a1.125 1.125 0 01-1.125-1.125v-3c0-.621.504-1.125 1.125-1.125H8.625a1.125 1.125 0 011.125 1.125v3zM18.633 10.5c0 3.806-2.693 7.308-6 7.308S6.633 14.306 6.633 10.5s2.693-7.308 7.308-7.308c3.695 0 7.308 2.693 7.308 7.308zM15.75 21c0 .621-.504 1.125-1.125 1.125h-3a1.125 1.125 0 01-1.125-1.125v-3c0-.621.504-1.125 1.125-1.125h3a1.125 1.125 0 011.125 1.125v3z'
							/>
						</svg>
					</button>
				</div>
			</div>
		</section>
	);
};

export default Hero;
