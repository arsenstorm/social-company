import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "Istota",
		template: "%s | Istota",
	},
	description: "create the essence",
};

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
