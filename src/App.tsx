import React, { Suspense } from "react";
import "./App.css";
import Hero from "./components/Hero";
const TrendingNow = React.lazy(() => import("./components/TrendingNow"));
function App() {
	return (
		<main>
			<div className='min-h-screen bg-background text-foreground transition-colors duration-300'>
				<Hero />

				<Suspense fallback={null}>
					<TrendingNow />
				</Suspense>
			</div>
		</main>
	);
}

export default App;
