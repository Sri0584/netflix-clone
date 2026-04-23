import WatchComponent from "@/components/WatchComponent";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/watch")({
	validateSearch: (search: Record<string, unknown>) => {
		const movie =
			typeof search.movie === "string" && search.movie.trim() !== "" ?
				search.movie.trim()
			:	undefined;

		return { movie };
	},
	component: WatchComponent,
});
