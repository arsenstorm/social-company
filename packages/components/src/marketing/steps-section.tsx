interface Step {
	title: string;
	description: string;
}

interface StepsSectionProps {
	title: string;
	description: string;
	steps: Step[];
	titleClassName?: string;
	descriptionClassName?: string;
	stepTitleClassName?: string;
	stepDescriptionClassName?: string;
	containerClassName?: string;
	stepsClassName?: string;
}

export function StepsSection({
	title,
	description,
	steps,
	titleClassName = "text-2xl font-medium text-balance text-black dark:text-white",
	descriptionClassName = "text-base text-balance text-black/70 dark:text-white/70",
	stepTitleClassName = "text-lg font-bold text-black dark:text-white",
	stepDescriptionClassName = "text-sm text-black/70 dark:text-white/70 text-balance",
	containerClassName = "flex flex-col gap-2",
	stepsClassName = "grid gap-3 mt-4",
}: StepsSectionProps) {
	return (
		<div className={containerClassName}>
			<h2 className={titleClassName}>{title}</h2>
			<p className={descriptionClassName}>{description}</p>

			<div className={stepsClassName}>
				{steps.map((step, index) => (
					<div key={step.title} className="flex flex-col">
						<div className={stepTitleClassName}>
							{index + 1}. {step.title}
						</div>
						<p className={stepDescriptionClassName}>{step.description}</p>
					</div>
				))}
			</div>
		</div>
	);
}
