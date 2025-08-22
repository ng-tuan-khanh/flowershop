import React, { useEffect, useState } from "react";
import {
	useStripe,
	useElements,
	PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/hooks/useOrderStore";

const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

interface CheckoutProps {
	amount: number;
}

function Checkout(props: CheckoutProps) {
	const { amount } = props;
	const stripe = useStripe();
	const elements = useElements();
	const [errorMessage, setErrorMessage] = useState<string>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [clientSecret, setClientSecret] = useState<string>("");

	const createOrder = useOrderStore((state) => state.createOrder);

	useEffect(() => {
		fetch("/api/create-payment-intent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, [amount]);

	const handlePayment = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsLoading(true);
		if (!stripe || !elements) {
			return;
		}

		createOrder();
		const { error: submitError } = await elements.submit();
		if (submitError) {
			setErrorMessage(submitError.message);
			setIsLoading(false);
			return;
		}
		const { error } = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: {
				return_url: `${FRONTEND_URL}/orders`,
			},
		});

		if (error) {
			// This point is only reached if there's an immediate error when
			// confirming the payment. Show the error to your customer (for example, payment details incomplete)
			setErrorMessage(error.message);
		} else {
		}

		setIsLoading(false);
	};

	return (
		<form onSubmit={handlePayment}>
			{clientSecret && <PaymentElement />}{" "}
			<Button
				type="submit"
				className="w-full mt-8 p-6 cursor-pointer"
				disabled={!stripe || isLoading}
			>
				{!isLoading ? `Pay $${amount}` : "Processing..."}
			</Button>
		</form>
	);
}

export default Checkout;
