// Components

import { HeroSection } from "@social/components/marketing/hero-section";
import { SectionDivider } from "@social/components/marketing/section-divider";

export default function Home() {
	return (
		<div className="flex flex-col">
			<HeroSection
				title="Trend finding for developers"
				description="Find the latest trends in social media for your projects with a single API call—built by developers, for developers."
			/>

			<SectionDivider />
		</div>
	);
}
