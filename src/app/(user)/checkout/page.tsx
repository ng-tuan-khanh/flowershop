"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import {
// 	Form,
// 	FormControl,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from "@/components/ui/form";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useQuery from "@/hooks/useQuery";
import OrderSummary from "@/components/cart/OrderSummary";
import { CartItem } from "@/lib/types/cart";
import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/hooks/useOrderStore";
import Checkout from "@/components/checkout/Checkout";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
);

const formSchema = z.object({
	fullName: z.string().min(1, "Full name is required"),
	country: z.string().min(1, "Country is required"),
	address1: z.string().min(1, "Address is required"),
	address2: z.string().optional(),
	city: z.string().min(1, "City is required"),
	state: z.string().min(1, "State/Province is required"),
	zip: z.string().min(1, "ZIP/Postal code is required"),
	cardNumber: z.string().min(1, "Card number is required"),
	expiryDate: z.string().min(1, "Expiry date is required"),
	cvc: z.string().min(1, "CVC is required"),
});

export default function CheckoutPage() {
	const router = useRouter();
	const { data: cartItems, isLoading, error } = useQuery("/cart-items/");
	// const createOrder = useOrderStore((state) => state.createOrder);

	// const form = useForm<z.infer<typeof formSchema>>({
	// 	resolver: zodResolver(formSchema),
	// 	defaultValues: {
	// 		fullName: "",
	// 		country: "",
	// 		address1: "",
	// 		address2: "",
	// 		city: "",
	// 		state: "",
	// 		zip: "",
	// 		cardNumber: "",
	// 		expiryDate: "",
	// 		cvc: "",
	// 	},
	// });

	// function onSubmit(values: z.infer<typeof formSchema>) {
	// 	createOrder();
	// 	// router.push("/orders");
	// }

	if (isLoading || error) return <div></div>;

	let amount = cartItems.reduce((acc: number, item: CartItem) => {
		let isDiscountActive = false;
		if (item.product.pricing_rule) {
			const startTime = new Date(item.product.pricing_rule.start_time);
			const endTime = new Date(item.product.pricing_rule.end_time);
			const now = new Date();

			if (now >= startTime && now <= endTime) {
				isDiscountActive = true;
			}
		}

		const discount =
			isDiscountActive && item.product.pricing_rule
				? Number(item.product.pricing_rule.time_discount) +
				  Number(item.product.condition_discount)
				: Number(item.product.condition_discount);
		return (
			acc +
			(item.product.price - (item.product.price * discount) / 100) *
				item.quantity
		);
	}, 0);
	amount = Math.round((amount + Number.EPSILON) * 100) / 100;

	return (
		<Layout>
			<div className="max-w-7xl mx-auto py-16 flex gap-16 justify-center">
				<div className="w-1/2">
					{amount ? (
						<Elements
							stripe={stripePromise}
							options={{
								mode: "payment",
								amount: convertToSubcurrency(amount),
								currency: "usd",
							}}
						>
							<Checkout amount={amount} />
						</Elements>
					) : (
						<div className="flex gap-2">
							<h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
							<span className="text-2xl text-gray-600">(No items)</span>
						</div>
					)}

					{/* <Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<Card>
								<CardHeader>
									<CardTitle className="text-xl font-bold">
										Shipping Information
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<FormField
										control={form.control}
										name="fullName"
										render={({ field }: { field: any }) => (
											<FormItem>
												<FormLabel>Full name</FormLabel>
												<FormControl>
													<Input placeholder="John Doe" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="country"
										render={({ field }: { field: any }) => (
											<FormItem>
												<FormLabel>Country</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select a country" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="VN">Vietnam</SelectItem>
														<SelectItem value="KH">Cambodia</SelectItem>
														<SelectItem value="LA">Laos</SelectItem>
														<SelectItem value="TH">Thailand</SelectItem>
														<SelectItem value="MY">Malaysia</SelectItem>
														<SelectItem value="SG">Singapore</SelectItem>
														<SelectItem value="ID">Indonesia</SelectItem>
														<SelectItem value="PH">Philippines</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="address1"
										render={({ field }: { field: any }) => (
											<FormItem>
												<FormLabel>Address line 1</FormLabel>
												<FormControl>
													<Input placeholder="123 Main St" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="address2"
										render={({ field }: { field: any }) => (
											<FormItem>
												<FormLabel>Address line 2 (Optional)</FormLabel>
												<FormControl>
													<Input placeholder="Apt, suite, etc." {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className="grid grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="city"
											render={({ field }: { field: any }) => (
												<FormItem>
													<FormLabel>City</FormLabel>
													<FormControl>
														<Input placeholder="New York" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="state"
											render={({ field }: { field: any }) => (
												<FormItem>
													<FormLabel>State / Province</FormLabel>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select a state" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															<SelectItem value="HN">Hanoi</SelectItem>
															<SelectItem value="HCM">
																Ho Chi Minh City
															</SelectItem>
															<SelectItem value="DN">Da Nang</SelectItem>
															<SelectItem value="HUE">Hue</SelectItem>
															<SelectItem value="HP">Hai Phong</SelectItem>
															<SelectItem value="BG">Bac Giang</SelectItem>
															<SelectItem value="BL">Bac Lieu</SelectItem>
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<FormField
										control={form.control}
										name="zip"
										render={({ field }: { field: any }) => (
											<FormItem>
												<FormLabel>ZIP / Postal code</FormLabel>
												<FormControl>
													<Input placeholder="10001" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="text-xl font-bold">
										Payment Details
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<FormField
										control={form.control}
										name="cardNumber"
										render={({ field }: { field: any }) => (
											<FormItem>
												<FormLabel>Card number</FormLabel>
												<FormControl>
													<Input placeholder="**** **** **** ****" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<div className="grid grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="expiryDate"
											render={({ field }: { field: any }) => (
												<FormItem>
													<FormLabel>Expiration date (MM/YY)</FormLabel>
													<FormControl>
														<Input placeholder="MM/YY" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="cvc"
											render={({ field }: { field: any }) => (
												<FormItem>
													<FormLabel>CVC</FormLabel>
													<FormControl>
														<Input placeholder="123" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</CardContent>
							</Card>

							<Button type="submit" className="w-full p-6 cursor-pointer">
								Pay ${amount.toFixed(2)}
							</Button>
						</form>
					</Form> */}
				</div>
				<div>
					<OrderSummary
						price={amount}
						isDisabled={!cartItems || cartItems.length === 0}
						hideCheckoutButton
					/>
				</div>
			</div>
		</Layout>
	);
}
