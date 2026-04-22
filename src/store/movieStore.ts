import type { Movie } from "@/types/types";
import { create } from "zustand";

type MovieStores = {
	baseMovies: Movie[];
	setBaseMovies: (r: Movie[]) => void;
};

const useBaseMovies = create<MovieStores>((set) => ({
	baseMovies: [] as Movie[],
	setBaseMovies: (r: Movie[]) => set({ baseMovies: r }),
}));

export default useBaseMovies;
