import React from "react";

function PageHeader({ numProducts }: { numProducts?: number }) {
	return (
		<div className="bg-green-50 px-20 py-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<h1 className="text-xl font-bold text-gray-800">
						{numProducts && numProducts > 0
							? numProducts === 1
								? `${numProducts} Product`
								: `${numProducts} Products`
							: "No Products"}
					</h1>
				</div>
				{/* <div className="flex items-center gap-2 border border-gray-400 rounded px-3 py-2">
					<span className="text-sm font-medium text-gray-700">
						Sort by popularity
					</span>
					<ChevronDown className="w-6 h-6 text-gray-600" />
				</div> */}
			</div>
		</div>
	);
}

export default PageHeader;
