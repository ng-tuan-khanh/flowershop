"use client";

import Layout from "@/components/Layout";
import useQuery from "@/hooks/useQuery";
import React from "react";
import { Order } from "@/lib/types/order";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import OrderTableRow from "@/components/orders/OrderTableRow";

function OrdersPage() {
	const { data: orders, error, isLoading } = useQuery("/orders/");

	if (isLoading || error) return <div></div>;

	return (
		<Layout>
			<div className="max-w-7xl mx-auto py-10">
				<h1 className="text-3xl font-bold mb-8">My Orders</h1>
				{orders && orders.length === 0 ? (
					<div className="text-center">
						<p className="text-lg text-muted-foreground mb-4">
							You have not placed any orders yet.
						</p>
						<Button asChild>
							<Link href="/">Start Shopping</Link>
						</Button>
					</div>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Order ID</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Items</TableHead>
								<TableHead className="text-right">Total</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders &&
								orders.map((order: Order) => (
									<OrderTableRow key={order.id} order={order} />
								))}
						</TableBody>
					</Table>
				)}
			</div>
		</Layout>
	);
}

export default OrdersPage;
