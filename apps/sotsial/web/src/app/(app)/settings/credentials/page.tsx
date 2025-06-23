// UI
import { Button } from "@social/ui/button";
import { Card } from "@social/ui/card";
import { Divider } from "@social/ui/divider";
import { PageHeading } from "@social/ui/page-heading";

export default function CredentialsPage() {
	return (
		<div>
			<PageHeading
				title="Credentials"
				description="Manage your custom social media OAuth clients."
			>
				<Button color="dark/white" href="/settings">
					Return to settings
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
