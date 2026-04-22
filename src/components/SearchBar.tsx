import useSearchMovies from "@/store/apiStore";
import { Search, X } from "lucide-react";
import { useState, useRef, useTransition } from "react";
import { useNavigate } from "@tanstack/react-router";

const SearchBar = () => {
	const navigate = useNavigate();
	const [showInput, setShowInput] = useState(false);
	const [isPending, startTransition] = useTransition();
	const { setQuery, query } = useSearchMovies();

	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const handleBlur = () => {
		setShowInput(false);
	};
	const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);

		// Clear previous timeout
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		// Set new debounced search with useTransition
		timeoutRef.current = setTimeout(() => {
			startTransition(() => {
				navigate({ to: "/search", search: { movie: e.target.value } });
			});
		}, 1000);
	};

	const handleCloseInput = () => {
		setShowInput(false);
		startTransition(() => {
			setQuery("");
			navigate({ to: "/" });
		});
	};

	return (
		<div className='flex items-center gap-2'>
			{showInput ?
				<>
					<input
						type='text'
						placeholder='Search movies...'
						className='w-full px-3 py-2 placeholder:text-gray-500 border border-gray-500 rounded focus:outline-none focus:border-blue-500'
						onChange={handleSearchQueryChange}
						onBlur={handleBlur}
						value={query}
						autoFocus
						disabled={isPending}
					/>
					<button
						onClick={handleCloseInput}
						className='p-2 bg-gray-700 rounded transition'
					>
						{isPending ?
							<Search size={20} className='text-gray-400 animate-spin' />
						:	<X size={20} className='text-white' />}
					</button>
				</>
			:	<button
					onClick={() => setShowInput(true)}
					className='p-2 bg-gray-700 rounded transition'
				>
					<Search size={20} className='text-white' />
				</button>
			}
		</div>
	);
};

export default SearchBar;
