"use client";

import { Button, Input } from "@headlessui/react";
import { HeroSection } from "@social/components/marketing/hero-section";
import { SectionDivider } from "@social/components/marketing/section-divider";
import { Link } from "@social/ui/link";

export default function Home() {
	return (
		<div className="flex flex-col">
			<HeroSection
				title="Social media marketing done by developers, for developers."
				description="Zroby is your personal AI agent that discovers, creates, and distributes content across social media platforms."
			/>

			<SectionDivider />

			<div className="flex flex-col gap-2">
				<h2 className="text-2xl font-medium text-balance">How does it work?</h2>
				<p className="text-base text-balance text-black/70 dark:text-white/70">
					Zroby is an AI agent that combines the power of{" "}
					<Link
						prefetch
						target="_blank"
						href="https://odkryj.dev"
						className="underline underline-offset-2 font-medium text-black dark:text-white"
					>
						Odkryj
					</Link>
					,{" "}
					<Link
						prefetch
						target="_blank"
						href="https://istota.dev"
						className="underline underline-offset-2 font-medium text-black dark:text-white"
					>
						Istota
					</Link>
					, and{" "}
					<Link
						prefetch
						target="_blank"
						href="https://sotsial.dev"
						className="underline underline-offset-2 font-medium text-black dark:text-white"
					>
						Sotsial
					</Link>{" "}
					into one seamless workflow.
				</p>
				<p className="text-base text-balance text-black/70 dark:text-white/70">
					Zroby orchestrates the entire process autonomously, making your
					content operations run themselves.
				</p>
			</div>

			<SectionDivider />

			<div className="flex flex-col gap-2">
				<h2 className="text-2xl font-medium text-balance">Interested?</h2>
				<p className="text-base text-balance text-black/70 dark:text-white/70">
					Join the waitlist to be the first to know when Zroby is ready.
				</p>
				<div className="flex flex-col sm:flex-row gap-2 max-w-md mt-4">
					<Input
						type="email"
						placeholder="Enter your email"
						className="w-full rounded-full border border-dashed border-black/10 dark:border-white/25 px-4 focus:outline-none focus:ring-2 focus:ring-black py-1.5"
					/>
					<Button className="bg-black hover:bg-neutral-950 text-white font-medium px-6 rounded-full transition-colors py-1.5 dark:bg-white dark:text-black">
						Join
					</Button>
				</div>
			</div>
		</div>
	);
}
