import { TableCell, TableRow } from "@/components/ui/table";
import { Order } from "@/lib/types/order";
import { format } from "date-fns";
import Image from "next/image";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import { useRouter } from "next/navigation";

function OrderTableRow({ order }: { order: Order }) {
	const router = useRouter();
	return (
		<TableRow key={order.id} className="h-24">
			<TableCell className="font-medium">#{order.id}</TableCell>
			<TableCell>{format(new Date(order.created_at), "PPP")}</TableCell>
			<TableCell>
				<OrderStatusBadge orderStatus={order.status.toUpperCase()} />
			</TableCell>
			<TableCell className="flex flex-wrap gap-4 items-center">
				{order.cart_items.map((item) => (
					<Image
						key={item.id}
						src={item.product.image_url}
						alt={item.product.name}
						width={500}
						height={500}
						className="rounded-md w-20 h-20 object-cover cursor-pointer hover:scale-105 transition-all duration-300"
						onClick={() => {
							router.push(`/details/${item.product.id}`);
						}}
					/>
				))}
			</TableCell>
			<TableCell className="text-right font-medium">
				${order.total_price}
			</TableCell>
		</TableRow>
	);
}

export default OrderTableRow;
