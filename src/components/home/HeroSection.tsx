"use client";

import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function HeroSection() {
	const router = useRouter();
	const handleClick = () => {
		router.push("/listings");
	};
	return (
		<section className="bg-[url('/hero-image.jpg')] bg-cover bg-center w-full h-xs p-12">
			<div className=" flex flex-col justify-center items-center gap-8 text-white">
				<h1 className="text-3xl font-bold uppercase text-center">
					FLORA FLOWERS
				</h1>
				<p className="text-2xl font-medium text-center">
					Fresh seasonal arrangements
				</p>
				<button
					className="px-8 py-4 rounded flex items-center gap-2 text-white font-medium uppercase cursor-pointer bg-green-600 hover:bg-green-700"
					onClick={handleClick}
				>
					<ShoppingCart className="w-6 h-6" />
					SHOP NOW
				</button>
			</div>
		</section>
	);
}

export default HeroSection;
