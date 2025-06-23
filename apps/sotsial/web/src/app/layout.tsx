import "@social/ui/styles/globals.css";
import { ThemeProvider } from "@social/ui/theme-toggle";
import clsx from "clsx";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./providers";

const geistSans = localFont({
	src: "../fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});

const geistMono = localFont({
	src: "../fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

const boska = localFont({
	src: "../fonts/Boska.woff2",
	variable: "--font-boska",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Sotsial",
	description: "API-first content publishing for all social media platforms.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={clsx(
					"antialiased",
					"bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950",
					geistSans.variable,
					geistMono.variable,
					boska.variable,
				)}
			>
				<ThemeProvider enableSystem={false} attribute="class">
					<Providers>{children}</Providers>
				</ThemeProvider>
			</body>
		</html>
	);
}
