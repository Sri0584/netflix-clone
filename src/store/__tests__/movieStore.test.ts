import { beforeEach } from "node:test";
import { describe, expect, test } from "vitest";
import useBaseMovies from "../movieStore";

describe("movies store", () => {
	beforeEach(() => {
		useBaseMovies.setState({ baseMovies: [] });
	});
	test("set basemovies", () => {
		const movies = [
			{ id: 1, title: "Breaking Bad", poster_path: "/bb.jpg" },
			{ id: 2, title: "Dexter", poster_path: "/dx.jpg" },
		];
		useBaseMovies.getState().setBaseMovies(movies);
		useBaseMovies.setState({ baseMovies: movies });
		const { baseMovies } = useBaseMovies.getState();
		expect(baseMovies).toEqual(movies);
	});
});
