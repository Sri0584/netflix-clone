import { create } from "zustand";

type AuthStoreState = {
	signedIn: boolean;
	setSignedIn: (r: boolean) => void;
};

const useAuth = create<AuthStoreState>((set) => ({
	signedIn: false,
	setSignedIn: (r: boolean) => set({ signedIn: r }),
}));

export default useAuth;
