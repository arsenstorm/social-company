import { ReactNode } from "react";

interface Platform {
	name: string;
	icon: ReactNode;
}

interface PlatformGridProps {
	platforms: Platform[];
	title?: string;
	description?: string;
	gridClassName?: string;
	itemClassName?: string;
	iconClassName?: string;
}

export function PlatformGrid({
	platforms,
	title,
	description,
	gridClassName = "grid grid-cols-2 md:grid-cols-4 gap-4 mt-4",
	itemClassName = "flex flex-col items-center justify-center p-4 border border-dashed border-black/10 dark:border-white/25 rounded-lg hover:border-black/20 dark:hover:border-white/40 transition-colors",
	iconClassName = "h-8 w-8 mb-2 flex items-center justify-center",
}: PlatformGridProps) {
	return (
		<div className="flex flex-col gap-2">
			{title && (
				<h2 className="text-2xl font-medium text-balance text-black dark:text-white">
					{title}
				</h2>
			)}
			{description && (
				<p className="text-base text-balance text-black/70 dark:text-white/70">
					{description}
				</p>
			)}

			<div className={gridClassName}>
				{platforms.map((platform) => (
					<div key={platform.name} className={itemClassName}>
						<div className={iconClassName}>{platform.icon}</div>
						<p className="text-center text-sm font-medium text-black dark:text-white">
							{platform.name}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
