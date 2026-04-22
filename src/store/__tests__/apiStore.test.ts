import { beforeEach, describe, expect, test } from "vitest";
import useSearchMovies from "../apiStore";
import useBaseMovies from "../movieStore";

describe("useSearchMovies store", () => {
	beforeEach(() => {
		useSearchMovies.setState({ query: "", results: [] });
		useBaseMovies.setState({
			baseMovies: [
				{ id: 1, title: "Breaking Bad", poster_path: "/bb.jpg" },
				{ id: 2, title: "Dexter", poster_path: "/dx.jpg" },
			],
		});
	});
	test("performs search", () => {
		useSearchMovies.getState().performSearch("break");
		const { query, results } = useSearchMovies.getState();
		expect(query).toBe("break");
		expect(results).toEqual([
			{
				id: 1,
				title: "Breaking Bad",
				poster_path: "/bb.jpg",
			},
		]);
	});
	test("clears results for whitespace-only query", () => {
		useSearchMovies.getState().performSearch("  ");
		const { query, results } = useSearchMovies.getState();
		expect(query).toBe("");
		expect(results).toEqual([]);
	});
});
