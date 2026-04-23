import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ClerkProvider } from "@clerk/react";
import { routeTree } from "./routeTree.gen.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

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
const queryClient = new QueryClient();
const rootElement = document.getElementById("root");
if (rootElement) {
	const app = (
		<StrictMode>
			<ClerkProvider publishableKey={publishableKey} afterSignOutUrl='/'>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</ClerkProvider>
		</StrictMode>
	);

	if (rootElement.innerHTML.trim().length > 0) {
		hydrateRoot(rootElement, app);
	} else {
		createRoot(rootElement).render(app);
	}
}
