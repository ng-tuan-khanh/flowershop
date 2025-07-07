import { useEffect, useState } from "react";

export enum Breakpoint {
	sm = 640,
	md = 768,
	lg = 1024,
	xl = 1280,
	"2xl" = 1536,
}

export const useBreakpoint = () => {
	const [breakpoint, setBreakpoint] = useState({
		sm: false,
		md: false,
		lg: false,
		xl: false,
		"2xl": false,
	});

	useEffect(() => {
		const handleResize = () => {
			setBreakpoint({
				sm: window.innerWidth >= Breakpoint.sm,
				md: window.innerWidth >= Breakpoint.md,
				lg: window.innerWidth >= Breakpoint.lg,
				xl: window.innerWidth >= Breakpoint.xl,
				"2xl": window.innerWidth >= Breakpoint["2xl"],
			});
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return breakpoint;
};
