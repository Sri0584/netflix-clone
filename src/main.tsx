import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";

// Create a new router instance
const router = createRouter({
	routeTree,
	context: {},
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
});
// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
const rootElement = document.getElementById("root");
if (rootElement) {
	const app = (
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	);

	if (rootElement.innerHTML.trim().length > 0) {
		hydrateRoot(rootElement, app);
	} else {
		createRoot(rootElement).render(app);
	}
}
