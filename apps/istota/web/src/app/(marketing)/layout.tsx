// Next

// Components
import { Logo } from "@social/components/logo/istota";
import { MarketingHeader } from "@social/components/marketing/header";
import { MarketingContainer } from "@social/components/marketing/marketing-container";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "Istota",
		template: "%s | Istota",
	},
	description: "create the essence",
};

export default function MarketingLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<MarketingContainer>
			<MarketingHeader
				logo={<Logo className="size-6" />}
				logoText="Istota"
				navItems={[
					{
						href: "/docs",
						label: "Docs",
						className:
							"text-sm text-black/70 hover:text-black hidden md:inline-flex",
					},
				]}
				ctaButton={{
					href: "/continue",
					label: "Get Started →",
					className:
						"bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full transition-colors text-sm font-medium hover:bg-black/90 dark:hover:bg-white/90",
				}}
			/>
			<div className="flex-1 grow">{children}</div>
			<footer className="w-full py-6 mt-6 border-t border-dashed border-black/10">
				<div className="container mx-auto flex items-center justify-between">
					<p className="text-sm text-black/50">
						&copy; {new Date().getFullYear()} Arsen Shkrumelyak. All rights
						reserved.
					</p>
				</div>
			</footer>
		</MarketingContainer>
	);
}
