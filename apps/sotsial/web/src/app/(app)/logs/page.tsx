// Components

// UI
import { Card } from "@social/ui/card";
import { Divider } from "@social/ui/divider";
import LogsHeading from "./page.client";

export default async function Logs() {
	return (
		<div>
			<LogsHeading />
			{/*<Card
				title="Something wrong?"
				description="If something doesn’t seem right with the logs, please contact support."
				cta="Get help"
				href="/help"
			/>*/}
			<Card
				title="Logs are coming soon."
				description="We are working on adding more detailed logs to help you debug any issues."
			/>
			<Divider className="my-6" soft />
			<div className="flex flex-col gap-4 mt-4">
				{/* TODO: Add logs table */}
			</div>
		</div>
	);
}
