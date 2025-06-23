interface FeatureSectionProps {
	title: string;
	description: string;
	children?: React.ReactNode;
	titleClassName?: string;
	descriptionClassName?: string;
	containerClassName?: string;
}

export function FeatureSection({
	title,
	description,
	children,
	titleClassName = "text-2xl font-medium text-balance text-black dark:text-white",
	descriptionClassName = "text-base text-balance text-black/70 dark:text-white/70",
	containerClassName = "flex flex-col gap-2",
}: FeatureSectionProps) {
	return (
		<div className={containerClassName}>
			<h2 className={titleClassName}>{title}</h2>
			<p className={descriptionClassName}>{description}</p>
			{children}
		</div>
	);
}
