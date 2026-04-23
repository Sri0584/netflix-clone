import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { TMDBResponse } from "@/types/types";

// Mock fetch function - replace with your actual API call
async function fetchMoviesPage(
	page: number,
	token: string,
): Promise<TMDBResponse> {
	const url = `${import.meta.env.VITE_API_URL_ALLPAGES}&page=${page.toString()}`;
	const res = await fetch(url, {
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) throw new Error("Failed to fetch movies");
	return (await res.json()) as TMDBResponse;
}

const useInfiniteMovies = () => {
	const token = import.meta.env.VITE_TMDB_AUTH_TOKEN;

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
		useInfiniteQuery({
			queryKey: ["infinite-movies"],
			queryFn: async ({ pageParam }) => {
				if (!token) {
					return { page: 1, results: [], total_pages: 0, total_results: 0 };
				}
				return fetchMoviesPage(pageParam, token);
			},
			initialPageParam: 1,
			getNextPageParam: (lastPage) => {
				const nextPage = lastPage.page + 1;
				return nextPage <= lastPage.total_pages ? nextPage : undefined;
			},
		});

	const movies = useMemo(
		() => data?.pages.flatMap((page) => page.results) ?? [],
		[data],
	);

	return {
		movies,
		isLoading,
		isFetchingNextPage,
		hasNextPage,

		fetchNextPage,
	};
};

export default useInfiniteMovies;
