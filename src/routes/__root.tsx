import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import Header from "../components/Header";

export const Route = createRootRoute({
	component: () => (
		<>
			<a href='#main-content' className='sr-only'>Skip to main content</a>
			<Header />
			<main id='main-content'>
				<Outlet />
			</main>
			<TanStackDevtools
				config={{
					position: "bottom-left",
				}}
				plugins={[
					{
						name: "Tanstack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
				]}
			/>
		</>
	),
	errorComponent: ({ error }) => (
		<div>Something went wrong: {error.message}</div>
	),
	notFoundComponent: () => <div>Page not found,404</div>,
});
