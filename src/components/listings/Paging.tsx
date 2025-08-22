import React from "react";

interface PagingProps {
	page: number;
	numPages: number;
	setPage: (page: number) => void;
}

function Paging(props: PagingProps) {
	const { page, numPages, setPage } = props;
	return (
		<nav className="flex flex-row justify-end p-4">
			<ul className="inline-flex -space-x-px">
				{Array.from({ length: numPages }, (_, index) => (
					<li key={index}>
						<button
							className={`px-4 py-2 border ${
								page === index + 1
									? "bg-green-500 text-white"
									: "bg-white text-gray-700"
							}`}
							onClick={() => setPage(index + 1)}
						>
							{index + 1}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default Paging;
