import { useEffect, useRef } from "react";
import MoviesList from "./MoviesList";
import useInfiniteMovies from "@/hooks/useInfiniteMovies";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TrendingNow = () => {
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const endRef = useRef<HTMLDivElement | null>(null);

	const { movies, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
		useInfiniteMovies();

	const handleLeftScroll = () => {
		scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
	};

	const handleRightScroll = () => {
		const el = scrollRef.current;
		if (!el) return;

		el.scrollBy({ left: el.clientWidth * 0.8, behavior: "smooth" });
	};

	useEffect(() => {
		const root = scrollRef.current;
		const target = endRef.current;

		if (!root || !target) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const firstEntry = entries[0];
				console.log(firstEntry);

				if (firstEntry.isIntersecting && hasNextPage && !isFetchingNextPage) {
					void fetchNextPage();
				}
			},
			{
				root,
				threshold: 0.8,
				rootMargin: "0px 100px 0px 0px",
			},
		);

		observer.observe(target);

		return () => {
			observer.disconnect();
		};
	}, [hasNextPage, isFetchingNextPage, fetchNextPage, movies.length]);

	return (
		<div className='px-6 mt-6 relative'>
			<h2>Trending Now</h2>

			{isLoading ?
				<div
					role='status'
					className='px-6 mt-6 py-12 text-center text-gray-400'
				>
					<div className='inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-600 border-t-red-500'></div>
					<p className='mt-4'>Loading movies...</p>
				</div>
			: movies.length > 0 ?
				<>
					<button
						aria-label='Scroll left'
						className='absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-red-500'
						onClick={handleLeftScroll}
					>
						<ChevronLeft size={28} />
					</button>

					<div ref={scrollRef} className='overflow-x-auto scrollbar-hide'>
						<div className='flex items-stretch'>
							<MoviesList movies={movies} />
							<div ref={endRef} aria-hidden='true' className='w-px shrink-0' />
						</div>
					</div>

					<button
						aria-label='Scroll right'
						className='absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-red-500'
						onClick={handleRightScroll}
					>
						<ChevronRight size={28} />
					</button>

					{isFetchingNextPage && (
						<p className='mt-4 text-center text-gray-400'>Loading more...</p>
					)}
				</>
			:	<div>No movies found!</div>}
		</div>
	);
};

export default TrendingNow;
