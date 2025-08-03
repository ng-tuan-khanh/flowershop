"use client";

import Image from "next/image";
import { ShoppingCart, User, Flower, DoorOpen, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/useAuthStore";

export default function Header() {
	const router = useRouter();

	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const signOut = useAuthStore((state) => state.signOut);

	const handleLogoClick = () => {
		router.push("/");
	};

	const handleShopClick = () => {
		router.push("/listings");
	};

	const handleOrdersClick = () => {
		router.push("/orders");
	};

	const handleCartClick = () => {
		router.push("/cart");
	};

	const handleSignInClick = () => {
		router.push("/sign-in");
	};

	const handleSignOutClick = () => {
		signOut();
		router.push("/");
	};

	return (
		<header className="bg-white h-21 flex justify-between items-center pl-16 pr-20 gap-16 border-b border-gray-200">
			{/* Logo */}
			<div
				className="flex items-center gap-1.5 cursor-pointer text-gray-600 hover:text-gray-900 hover:translate-y-[-2px] transition-all duration-300"
				onClick={handleLogoClick}
			>
				<div className="w-20 h-20 rounded">
					<Image src="/flora.png" alt="Flora" width={500} height={500} />
				</div>
				<span className="font-bold text-3xl">Flora</span>
			</div>

			{/* Navigation Menu */}
			<nav className="flex items-center gap-10 justify-center">
				<div
					className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-900 hover:translate-y-[-2px] transition-all duration-300"
					onClick={handleShopClick}
				>
					<Flower className="w-6 h-6" />
					<span className="text-sm">Shop</span>
				</div>
				{isAuthenticated ? (
					<>
						<div
							className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-900 hover:translate-y-[-2px] transition-all duration-300"
							onClick={handleOrdersClick}
						>
							<div className="flex items-center gap-2">
								<Truck className="w-6 h-6" />
								<span className="text-sm">Orders</span>
							</div>
						</div>
						<div
							className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-900 hover:translate-y-[-2px] transition-all duration-300"
							onClick={handleCartClick}
						>
							<div className="flex items-center gap-2">
								<ShoppingCart className="w-6 h-6" />
								<span className="text-sm">Cart</span>
							</div>
						</div>
						<div
							className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-900 hover:translate-y-[-2px] transition-all duration-300"
							onClick={handleSignOutClick}
						>
							<DoorOpen className="w-6 h-6" />
							<span className="text-sm">Sign out</span>
						</div>
					</>
				) : (
					<div
						className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-900 hover:translate-y-[-2px] transition-all duration-300"
						onClick={handleSignInClick}
					>
						<User className="w-6 h-6" />
						<span className="text-sm">Sign in</span>
					</div>
				)}
			</nav>
		</header>
	);
}
