import { Link } from "@tanstack/react-router";
import SearchBar from "./SearchBar";

const Header = () => {
	return (
		<header className='relative top-0 left-0 right-0 z-[100] py-5 bg-gradient-to-b from-black/80 to-transparent'>
			<div className='px-6 md:px-6 flex justify-between items-center b'>
				<div className='flex-shrink-0'>
					<Link to='/' className='text-xl lg:text-4xl font-bold text-red-600'>
						REACTFLIX
					</Link>
				</div>
				<SearchBar />
			</div>
		</header>
	);
};

export default Header;
