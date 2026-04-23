import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
	Show,
	SignInButton,
	SignUpButton,
	UserButton,
	useUser,
} from "@clerk/react";
import SearchBar from "./SearchBar";
import useAuth from "@/store/useAuthStore";

const Header = () => {
	const { user } = useUser();
	const { setSignedIn } = useAuth();

	useEffect(() => {
		setSignedIn(!!user);
	}, [user, setSignedIn]);

	return (
		<header className='relative top-0 left-0 right-0 z-[100] py-5 bg-gradient-to-b from-black/80 to-transparent'>
			<div className='px-6 md:px-6 flex justify-between items-center'>
				<div className='flex-shrink-0'>
					<Link to='/' className='text-xl lg:text-4xl font-bold text-red-600'>
						REACTFLIX
					</Link>
				</div>
				<div className='flex items-center gap-4'>
					<SearchBar />
					<Show when='signed-out'>
						<SignInButton />
						<SignUpButton />
					</Show>
					<Show when='signed-in'>
						<UserButton />
					</Show>
				</div>
			</div>
		</header>
	);
};

export default Header;
