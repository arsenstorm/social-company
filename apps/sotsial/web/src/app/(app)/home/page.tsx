// UI
import { Card } from "@social/ui/card";
import { Divider } from "@social/ui/divider";
import { PageHeading } from "@social/ui/page-heading";

export default function Dashboard() {
	return (
		<div>
			<PageHeading
				title="Dashboard"
				description="An overview of your account."
			/>
			<Card
				title="Overviews, insights, and more."
				description="We’re working hard to bring these features to you."
			/>
			<Divider className="my-6" soft />
		</div>
	);
}
