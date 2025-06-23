import "@social/ui/styles/globals.css";
import clsx from "clsx";
import { Providers } from "./providers";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={clsx("antialiased")}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
