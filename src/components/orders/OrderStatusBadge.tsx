import { Badge } from "@/components/ui/badge";
import React from "react";

function OrderStatusBadge({ orderStatus }: { orderStatus: string }) {
	const color =
		orderStatus === "PROCESSING"
			? "bg-gray-500"
			: orderStatus === "SHIPPING"
			? "bg-yellow-500"
			: orderStatus === "COMPLETED"
			? "bg-green-500"
			: "bg-red-500";
	return <Badge className={color}>{orderStatus}</Badge>;
}

export default OrderStatusBadge;
