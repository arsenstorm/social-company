// Components

// UI
import { Card } from "@social/ui/card";
import { Divider } from "@social/ui/divider";
import { PageHeading } from "@social/ui/page-heading";
import { PostingForm } from "./page.client";

export default async function Posting() {
	return (
		<div>
			<PageHeading
				title="Create Post"
				description="Easily publish content to multiple platforms at once."
			/>
			<Card
				title="Need to connect more accounts?"
				description="You can add more connections from the connections page."
				cta="Go to connections"
				href="/connections"
			/>
			<Divider className="my-6" soft />
			<div className="flex flex-col gap-4 mt-4">
				<PostingForm />
			</div>
		</div>
	);
}
