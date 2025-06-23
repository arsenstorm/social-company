interface SimpleFooterProps {
	copyrightText?: string;
	year?: number;
	className?: string;
	containerClassName?: string;
}

export function SimpleFooter({
	copyrightText = "Arsen Shkrumelyak. All rights reserved.",
	year = new Date().getFullYear(),
	className = "w-full py-6 mt-6 border-t border-dashed border-black/10 dark:border-white/25",
	containerClassName = "container mx-auto flex items-center justify-between",
}: SimpleFooterProps) {
	return (
		<footer className={className}>
			<div className={containerClassName}>
				<p className="text-sm text-black/50 dark:text-white/50">
					&copy; {year} {copyrightText}
				</p>
			</div>
		</footer>
	);
}
