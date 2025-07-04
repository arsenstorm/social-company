import "@social/ui/styles/docs.css";

import { Layout } from "@social/components/docs/Layout";
import type { Section } from "@social/components/docs/SectionProvider";
import glob from "fast-glob";

export default async function RootLayout({
	children,
}: {
	readonly children: React.ReactNode;
}) {
	// TODO: On production, the docs navigation doesn't work because something below is wrong
	const pages = await glob("**/*.mdx", { cwd: "src/docs" });

	const allSectionsEntries = (await Promise.all(
		pages.map(async (filename) => [
			`/docs/${filename.replace(/page\.mdx$/, "")}`.replace(/\/$/, ""),
			(await import(`@/docs/${filename}`)).sections,
		]),
	)) as Array<[string, Array<Section>]>;

	const allSections = Object.fromEntries(allSectionsEntries);

	return (
		<div className="w-full">
			<Layout allSections={allSections}>{children}</Layout>
		</div>
	);
}
