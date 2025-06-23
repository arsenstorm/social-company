interface SectionDividerProps {
	className?: string;
}

export function SectionDivider({
	className = "my-6 border-dashed border-black/10 dark:border-white/25",
}: SectionDividerProps) {
	return <hr className={className} />;
}
