// Components
import { FeatureSection } from "@social/components/marketing/feature-section";
import { HeroSection } from "@social/components/marketing/hero-section";
import { PlatformGrid } from "@social/components/marketing/platform-grid";
import { SectionDivider } from "@social/components/marketing/section-divider";
import { StepsSection } from "@social/components/marketing/steps-section";

// Icons
import {
	FacebookIcon,
	InstagramIcon,
	LinkedinIcon,
	MediumIcon,
	ThreadsIcon,
	TiktokIcon,
	XTwitterIcon,
	YoutubeIcon,
} from "@social/icons/logos";

const platforms = [
	{ name: "Twitter", icon: <XTwitterIcon /> },
	{ name: "Instagram", icon: <InstagramIcon /> },
	{ name: "LinkedIn", icon: <LinkedinIcon /> },
	{ name: "Threads", icon: <ThreadsIcon /> },
	{ name: "Facebook", icon: <FacebookIcon /> },
	{ name: "Medium", icon: <MediumIcon /> },
	{ name: "YouTube", icon: <YoutubeIcon /> },
	{ name: "TikTok", icon: <TiktokIcon /> },
];

const steps = [
	{
		title: "Get your API Key",
		description:
			"Sign up with GitHub, add your payment method, and get your API key.",
	},
	{
		title: "Connect your accounts",
		description:
			"Connect all your social media accounts to the Sotsial platform.",
	},
	{
		title: "Start publishing",
		description:
			"Use the API to publish your content to all connected platforms.",
	},
];

export default function Home() {
	return (
		<div className="flex flex-col">
			<HeroSection
				title="API-first content publishing for all social platforms"
				description="Sotsial allows you to connect all your social media accounts and publish to them with a single API call."
			/>

			<SectionDivider />

			<PlatformGrid
				title="One API, all social platforms"
				description="Connect and publish to all major social media platforms with a single API call."
				platforms={platforms}
			/>

			<SectionDivider />

			<FeatureSection
				title="Designed for developers"
				description="Sotsial provides developers with powerful tools to integrate social publishing into their applications."
			/>

			<SectionDivider />

			<StepsSection
				title="How it works"
				description="Get up and running with Sotsial in minutes."
				steps={steps}
			/>
		</div>
	);
}
