import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Flora",
	description: "Online Flower Shop",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased`}>{children}</body>
		</html>
	);
}
