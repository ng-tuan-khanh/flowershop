import React from "react";
import { Order } from "@/lib/types/order";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { format } from "date-fns";

interface OrderCardProps {
	order: Order;
}

function OrderCard({ order }: OrderCardProps) {
	return (
		<Card>
			<CardHeader>
				<div className="flex justify-between">
					<CardTitle>Order #{order.id}</CardTitle>
					<Badge>{order.status}</Badge>
				</div>
				<p className="text-sm text-muted-foreground">
					{format(new Date(order.created_at), "PPP")}
				</p>
			</CardHeader>
			<CardContent className="flex flex-wrap gap-4">
				{order.cart_items.map((item) => (
					<div key={item.id} className="flex items-center gap-4">
						<Image
							src={item.product.image_url}
							alt={item.product.name}
							width={64}
							height={64}
							className="rounded-md"
						/>
						<div>
							<p className="font-medium">{item.product.name}</p>
							<p className="text-sm text-muted-foreground">
								Quantity: {item.quantity}
							</p>
						</div>
					</div>
				))}
			</CardContent>
			<CardFooter>
				<p className="font-semibold">Total: ${order.total_price}</p>
			</CardFooter>
		</Card>
	);
}

export default OrderCard;
