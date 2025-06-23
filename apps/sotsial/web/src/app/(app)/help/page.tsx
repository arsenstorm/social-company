// UI
import { Card } from "@social/ui/card";
import { Divider } from "@social/ui/divider";
import { PageHeading } from "@social/ui/page-heading";

export default function HelpPage() {
	return (
		<div>
			<PageHeading title="Help" description="Get help with Sotsial." />
			<Card
				title="We don’t have a help center yet."
				description="You can get in touch directly at help@sotsial.com or create an issue on GitHub."
			/>
			<Divider className="my-6" soft />
		</div>
	);
}
