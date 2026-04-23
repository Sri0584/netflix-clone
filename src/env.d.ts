/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_TMDB_IMAGES_ASSET_URL: string;
	readonly VITE_CLERK_PUBLISHABLE_KEY: string;
	readonly VITE_API_URL_ALLPAGES: string;
	readonly VITE_TMDB_AUTH_TOKEN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
