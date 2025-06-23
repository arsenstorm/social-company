interface LinkProps {
	href: string;
	className?: string;
	children: React.ReactNode;
}

// Use a simple Link component that can be replaced with next-view-transitions Link in the app
const Link = ({ href, className, children }: LinkProps) => (
	<a href={href} className={className}>
		{children}
	</a>
);

interface MarketingHeaderProps {
	logo?: React.ReactNode;
	logoText?: string;
	navItems?: Array<{
		href: string;
		label: string;
		className?: string;
	}>;
	ctaButton?: {
		href: string;
		label: string;
		className?: string;
	};
}

export function MarketingHeader({
	logo = undefined,
	logoText = "",
	navItems = [
		{
			href: "/docs",
			label: "Docs",
			className:
				"text-sm text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white hidden md:inline-flex",
		},
		{
			href: "/pricing",
			label: "Pricing",
			className:
				"text-sm text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white hidden md:inline-flex",
		},
	],
	ctaButton = {
		href: "/continue",
		label: "Dashboard →",
		className:
			"bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full transition-colors text-sm font-medium hover:bg-black/90 dark:hover:bg-white/90",
	},
}: MarketingHeaderProps) {
	return (
		<header className="w-full py-6 mb-6 border-b border-dashed border-black/10 dark:border-white/25">
			<div className="container mx-auto flex items-center justify-between">
				<Link
					href="/"
					className="flex items-center gap-2 text-black dark:text-white"
				>
					{logo}
					<span className="font-medium text-xl">{logoText}</span>
				</Link>

				<div className="flex items-center gap-6">
					{navItems.map((item) => (
						<Link key={item.href} href={item.href} className={item.className}>
							{item.label}
						</Link>
					))}
					<Link href={ctaButton.href} className={ctaButton.className}>
						{ctaButton.label}
					</Link>
				</div>
			</div>
		</header>
	);
}
