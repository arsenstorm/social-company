// Components

import { HeroSection } from "@social/components/marketing/hero-section";
import { SectionDivider } from "@social/components/marketing/section-divider";

export default function Home() {
	return (
		<div className="flex flex-col">
			<HeroSection
				title="Content creation for developers"
				description="Generate content for social media platforms with a single API call–built by developers, for developers."
			/>

			<SectionDivider />
		</div>
	);
}
