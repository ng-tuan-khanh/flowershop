import React from "react";

interface PageHeaderProps {
	numProducts?: number;
	children?: React.ReactNode;
}

function PageHeader(props: PageHeaderProps) {
	const { numProducts, children } = props;
	return (
		<div className="bg-green-50 px-20 h-20 py-6">
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
				{children}
			</div>
		</div>
	);
}

export default PageHeader;
