"use client";

// Hooks
import { useMounted } from "@mantine/hooks";
// Captcha
import { Captcha, CaptchaProvider } from "@social/auth/captcha";
// Themes
import { ThemeProvider, useTheme } from "next-themes";
// Nuqs
import { NuqsAdapter } from "nuqs/adapters/next/app";
// Sonner
import { Toaster as Sonner } from "sonner";

export function Providers({
	children,
}: {
	readonly children: React.ReactNode;
}) {
	const mounted = useMounted();

	if (!mounted) return null;

	return (
		<CaptchaProvider>
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				enableSystem
				disableTransitionOnChange
			>
				<NuqsAdapter>{children}</NuqsAdapter>
				<Toaster />
			</ThemeProvider>
			<Captcha invisible />
		</CaptchaProvider>
	);
}

export function Toaster() {
	const { resolvedTheme } = useTheme();

	if (!resolvedTheme) return null;

	return (
		<Sonner richColors theme={resolvedTheme === "dark" ? "dark" : "light"} />
	);
}
