interface HeroSectionProps {
	title: string;
	description: string;
	titleClassName?: string;
	descriptionClassName?: string;
	containerClassName?: string;
}

export function HeroSection({
	title,
	description,
	titleClassName = "text-4xl font-medium text-balance text-black dark:text-white",
	descriptionClassName = "text-lg text-balance text-black/70 dark:text-white/70",
	containerClassName = "flex flex-col gap-6",
}: HeroSectionProps) {
	return (
		<div className={containerClassName}>
			<h1 className={titleClassName}>{title}</h1>
			<p className={descriptionClassName}>{description}</p>
		</div>
	);
}
