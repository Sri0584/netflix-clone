import useBaseMovies from "@/store/movieStore";
import type { Movie, TMDBResponse } from "@/types/types";
import { useEffect, useState } from "react";

const token = import.meta.env.VITE_TMDB_AUTH_TOKEN;

type UseFetchOptions = {
	deferUntilIdle?: boolean;
	idleTimeoutMs?: number;
	requestTimeoutMs?: number;
};

const useFetch = ({
	deferUntilIdle = true,
	idleTimeoutMs = 1200,
	requestTimeoutMs = 8000,
}: UseFetchOptions = {}) => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const setBaseMovies = useBaseMovies((state) => state.setBaseMovies);

	useEffect(() => {
		let cancelled = false;
		let requestTimeoutId: ReturnType<typeof setTimeout> | null = null;
		let startDelayId: ReturnType<typeof setTimeout> | null = null;
		let idleCallbackId: number | null = null;
		let controller: AbortController | null = null;

		const fetchMovies = async () => {
			try {
				if (cancelled) return;

				if (!token) {
					setError("Missing TMDB_AUTH_TOKEN environment variable");
					setLoading(false);
					return;
				}

				controller = new AbortController();
				requestTimeoutId = setTimeout(() => controller?.abort(), requestTimeoutMs);

				const res = await fetch(import.meta.env.VITE_API_URL, {
					headers: {
						accept: "application/json",
						Authorization: `Bearer ${token}`,
					},
					signal: controller.signal,
					priority: 'high' as RequestInit['priority'],
				});

				if (requestTimeoutId) clearTimeout(requestTimeoutId);
				requestTimeoutId = null;

				if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

				const data = (await res.json()) as TMDBResponse;
				if (cancelled) return;
				setMovies(data.results);
				setBaseMovies(data.results);
			} catch (error) {
				if (cancelled) return;

				if (error instanceof Error && error.name === 'AbortError') {
					setError("Request timeout. Please try again.");
				} else {
					setError((error as Error).message);
				}
			} finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		};

		const startFetch = () => {
			if (cancelled) return;
			void fetchMovies();
		};

		if (deferUntilIdle) {
			if (typeof window !== "undefined" && "requestIdleCallback" in window) {
				idleCallbackId = window.requestIdleCallback(startFetch, {
					timeout: idleTimeoutMs,
				});
			} else {
				startDelayId = setTimeout(startFetch, 0);
			}
		} else {
			startFetch();
		}

		return () => {
			cancelled = true;

			if (idleCallbackId !== null && typeof window !== "undefined" && "cancelIdleCallback" in window) {
				window.cancelIdleCallback(idleCallbackId);
			}

			if (startDelayId) clearTimeout(startDelayId);
			if (requestTimeoutId) clearTimeout(requestTimeoutId);
			controller?.abort();
		};
	}, [deferUntilIdle, idleTimeoutMs, requestTimeoutMs, setBaseMovies]);

	return { movies, error, loading };
};

export default useFetch;
