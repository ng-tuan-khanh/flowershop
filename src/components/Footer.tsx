import React from "react";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

export default function Footer() {
	return (
		<footer className="bg-green-50">
			{/* Main Footer */}
			{/* Footer Bottom */}
			<div className="container mx-auto py-12">
				<div className="flex justify-end items-center mb-3">
					<div className="flex items-center gap-1">
						<span className="text-gray-600 text-sm">English</span>
					</div>
				</div>

				<div className="w-full h-0.5 bg-gray-300 mb-3"></div>

				<div className="flex justify-between items-center">
					<p className="text-gray-600 text-sm">
						227 Nguyen Van Cu, Ward 12, District 5, Ho Chi Minh City
					</p>
					<p className="text-gray-500 text-sm">
						©2025 Copyright reserved for Flora
					</p>
					<div className="flex items-center gap-6">
						<Instagram className="w-6 h-6 text-gray-700" />
						<Facebook className="w-6 h-6 text-gray-700" />
						<MessageCircle className="w-6 h-6 text-gray-700" />
					</div>
				</div>
			</div>
		</footer>
	);
}
