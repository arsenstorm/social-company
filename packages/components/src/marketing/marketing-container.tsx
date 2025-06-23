interface MarketingContainerProps {
	children: React.ReactNode;
	maxWidth?: string;
	className?: string;
}

export function MarketingContainer({
	children,
	maxWidth = "max-w-2xl",
	className = "bg-white text-black dark:bg-black dark:text-white min-h-screen",
}: MarketingContainerProps) {
	return (
		<div className={className}>
			<div
				className={`${maxWidth} mx-auto px-4 min-md:border-x border-dashed border-black/10 dark:border-white/25 min-h-screen flex flex-col`}
			>
				{children}
			</div>
		</div>
	);
}
