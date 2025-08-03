import { Truck } from "lucide-react";
import React from "react";

function DeliverySection() {
	return (
		<section className="bg-green-100 px-20 py-12">
			<div className="flex items-center gap-16">
				<div className="flex flex-col gap-4 flex-1">
					<h2 className="text-green-600 text-2xl font-bold tracking-wider uppercase">
						Same Day Delivery
					</h2>
					<p className="text-gray-600 text-xl font-medium">
						Order before 2 PM for same-day delivery. Fresh flowers guaranteed.
					</p>
				</div>

				<div className="w-80 h-56 bg-gradient-to-br from-green-200 to-yellow-200 rounded flex items-center justify-center">
					<Truck className="w-24 h-24 text-green-600" />
				</div>
			</div>
		</section>
	);
}

export default DeliverySection;
