// skipcq: JS-C1003
import * as mdxComponents from "@social/components/mdx";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents) {
	return {
		...components,
		...mdxComponents,
	};
}
