import React from "react";

function CartSection({
	numCartItems,
	children,
}: {
	numCartItems: number;
	children: React.ReactNode;
}) {
	return (
		<div className="flex-1">
			<div className="flex gap-2 mb-8">
				<h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
				<span className="text-2xl text-gray-600">
					{numCartItems > 1
						? `(${numCartItems} items)`
						: numCartItems == 1
						? `(${numCartItems} item)`
						: "(No items)"}
				</span>
			</div>
			<div className="space-y-6">{children}</div>
		</div>
	);
}

export default CartSection;
