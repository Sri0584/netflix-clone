import { createFileRoute } from "@tanstack/react-router";
import SearchComponent from "@/components/SearchComponent";

export const Route = createFileRoute("/search")({
	validateSearch: (search: Record<string, unknown>) => ({
		movie: search.movie as string | undefined,
	}),
	component: SearchComponent,
});
