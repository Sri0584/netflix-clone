import useBaseMovies from "@/store/movieStore";
import type { Movie, TMDBResponse } from "@/types/types";
import { useEffect, useState } from "react";
const token = import.meta.env.VITE_TMDB_AUTH_TOKEN;
const useFetch = () => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const setBaseMovies = useBaseMovies((state) => state.setBaseMovies);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				if (!token) {
					setError("Missing TMDB_AUTH_TOKEN environment variable");
					setLoading(false);
					return;
				}
				const res = await fetch(import.meta.env.VITE_API_URL, {
					headers: {
						accept: "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				const data = (await res.json()) as TMDBResponse;
				setMovies(data.results);
				setBaseMovies(data.results);
			} catch (error) {
				setError((error as Error).message);
			} finally {
				setLoading(false);
			}
		};
		fetchMovies();
	}, [setBaseMovies]);

	return { movies, error, loading };
};

export default useFetch;
