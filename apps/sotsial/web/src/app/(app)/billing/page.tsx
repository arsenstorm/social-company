// UI
import { Card } from "@social/ui/card";
import { Divider } from "@social/ui/divider";
import { PageHeading } from "@social/ui/page-heading";

export default function BillingPage() {
	return (
		<div>
			<PageHeading
				title="Billing"
				description="Manage your billing information."
			/>
			<Card
				title="Sotsial is free while in beta."
				description="Pricing will be announced soon."
			/>
			<Divider className="my-6" soft />
		</div>
	);
}
