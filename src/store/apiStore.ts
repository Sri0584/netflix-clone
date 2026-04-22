import type { Movie } from "@/types/types";
import { create } from "zustand";
import useBaseMovies from "./movieStore";

type SearchMovies = {
	query: string;
	results: Movie[];
	setQuery: (q: string) => void;
	setResults: (r: Movie[]) => void;
	performSearch: (q: string) => void;
};
const useSearchMovies = create<SearchMovies>((set) => ({
	query: "",
	results: [] as Movie[],
	setQuery: (q: string) => set({ query: q }),
	setResults: (r: Movie[]) => set({ results: r }),
	performSearch: (q: string) => {
		console.log(q, "q");
		set({ query: q });
		const qTrim = q.trim();
		if (qTrim === "") {
			set({ results: [] });
			return;
		}
		const baseMovies = useBaseMovies.getState().baseMovies;
		const filteredMovies: Movie[] = baseMovies?.filter((movie: Movie) =>
			movie.title.toLowerCase().includes(qTrim.toLowerCase()),
		);
		set({ results: filteredMovies });
	},
}));

export default useSearchMovies;
