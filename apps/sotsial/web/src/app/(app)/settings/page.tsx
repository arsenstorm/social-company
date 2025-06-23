// UI
import { Button } from "@social/ui/button";
import { Card } from "@social/ui/card";
import { Divider } from "@social/ui/divider";
import { PageHeading } from "@social/ui/page-heading";

export default function SettingsPage() {
	return (
		<div>
			<PageHeading title="Settings" description="Manage account settings.">
				<Button color="dark/white" href="/settings/credentials">
					Manage Credentials
				</Button>
			</PageHeading>
			<Card
				title="Coming soon!"
				description="We’re working on it—check back soon."
			/>
			<Divider className="my-6" soft />
		</div>
	);
}
