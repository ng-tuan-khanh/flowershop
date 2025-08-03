"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/hooks/useAuthStore";

interface AuthFormProps {
	isSignUp?: boolean;
}

function AuthForm({ isSignUp = false }: AuthFormProps) {
	const router = useRouter();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const signIn = useAuthStore((state) => state.signIn);
	const signUp = useAuthStore((state) => state.signUp);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const { username, email, password } = formData;
		if (isSignUp) {
			await signUp(username, email, password);
		} else {
			await signIn(username, password);
		}
		router.replace("/");
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						{isSignUp ? "Sign Up" : "Sign In"}
					</CardTitle>
					<CardDescription>
						{isSignUp
							? "Create your account"
							: "Enter your email and password to sign in"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
						<div className="flex flex-col gap-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="username"
								placeholder="Username"
								value={formData.username}
								onChange={handleInputChange}
							/>
						</div>
						{isSignUp && (
							<div className="flex flex-col gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Email address"
									value={formData.email}
									onChange={handleInputChange}
								/>
							</div>
						)}
						<div className="flex flex-col gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="Password"
								value={formData.password}
								onChange={handleInputChange}
							/>
						</div>
						{!isSignUp && (
							<Link
								href="/sign-up"
								className="text-sm text-green-600 hover:text-green-700"
							>
								New here? Sign up now.
							</Link>
						)}
						<Button
							type="submit"
							className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer"
						>
							{isSignUp ? "Sign Up" : "Sign In"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

export default AuthForm;
