"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Tag } from "@social/components/docs/Tag";
import clsx from "clsx";
import {
	Children,
	createContext,
	isValidElement,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { create } from "zustand";

const languageNames: Record<string, string> = {
	js: "JavaScript",
	ts: "TypeScript",
	javascript: "JavaScript",
	typescript: "TypeScript",
	php: "PHP",
	python: "Python",
	ruby: "Ruby",
	go: "Go",
};

function getPanelTitle({
	title,
	language,
}: {
	title?: string;
	language?: string;
}) {
	if (title) {
		return title;
	}
	if (language && language in languageNames) {
		return languageNames[language];
	}
	return "Code";
}

function ClipboardIcon(props: Readonly<React.ComponentPropsWithoutRef<"svg">>) {
	return (
		<svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
			<path
				strokeWidth="0"
				d="M5.5 13.5v-5a2 2 0 0 1 2-2l.447-.894A2 2 0 0 1 9.737 4.5h.527a2 2 0 0 1 1.789 1.106l.447.894a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2Z"
			/>
			<path
				fill="none"
				strokeLinejoin="round"
				d="M12.5 6.5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2m5 0-.447-.894a2 2 0 0 0-1.79-1.106h-.527a2 2 0 0 0-1.789 1.106L7.5 6.5m5 0-1 1h-3l-1-1"
			/>
		</svg>
	);
}

function CopyButton({ code }: { readonly code: string }) {
	const [copyCount, setCopyCount] = useState(0);
	const copied = copyCount > 0;

	useEffect(() => {
		if (copyCount > 0) {
			const timeout = setTimeout(() => setCopyCount(0), 1000);
			return () => {
				clearTimeout(timeout);
			};
		}
		return undefined;
	}, [copyCount]);

	const handleCopy = useCallback(() => {
		window.navigator.clipboard.writeText(code).then(() => {
			setCopyCount((count) => count + 1);
		});
	}, [code]);

	return (
		<button
			type="button"
			className={clsx(
				"group/button absolute right-4 top-3.5 overflow-hidden rounded-full py-1 pl-2 pr-3 text-2xs font-medium opacity-0 backdrop-blur transition focus:opacity-100 group-hover:opacity-100",
				copied
					? "bg-amber-400/10 ring-1 ring-inset ring-amber-400/20"
					: "bg-white/5 hover:bg-white/7.5 dark:bg-white/2.5 dark:hover:bg-white/5",
			)}
			onClick={handleCopy}
		>
			<span
				aria-hidden={copied}
				className={clsx(
					"pointer-events-none flex items-center gap-0.5 text-zinc-400 transition duration-300",
					copied && "-translate-y-1.5 opacity-0",
				)}
			>
				<ClipboardIcon className="h-5 w-5 fill-zinc-500/20 stroke-zinc-500 transition-colors group-hover/button:stroke-zinc-400" />
				Copy
			</span>
			<span
				aria-hidden={!copied}
				className={clsx(
					"pointer-events-none absolute inset-0 flex items-center justify-center text-amber-400 transition duration-300",
					!copied && "translate-y-1.5 opacity-0",
				)}
			>
				Copied!
			</span>
		</button>
	);
}

function CodePanelHeader({
	tag,
	label,
}: {
	readonly tag?: string;
	readonly label?: string;
}) {
	if (!tag && !label) {
		return null;
	}

	return (
		<div className="flex h-9 items-center gap-2 border-y border-b-white/7.5 border-t-transparent bg-white/2.5 px-4 dark:border-b-white/5 dark:bg-white/1">
			{tag && (
				<div className="dark flex">
					<Tag variant="small">{tag}</Tag>
				</div>
			)}
			{tag && label && (
				<span className="h-0.5 w-0.5 rounded-full bg-zinc-500" />
			)}
			{label && <span className="text-xs text-zinc-400">{label}</span>}
		</div>
	);
}

function CodePanel({
	children,
	tag,
	label,
	code,
}: {
	readonly children: React.ReactNode;
	readonly tag?: string;
	readonly label?: string;
	readonly code?: string;
}) {
	const child = Children.only(children);

	if (isValidElement(child)) {
		const childProps = child.props as {
			tag?: string;
			label?: string;
			code?: string;
		};
		tag = childProps.tag ?? tag;
		label = childProps.label ?? label;
		code = childProps.code ?? code;
	}

	if (!code) {
		throw new Error(
			"`CodePanel` requires a `code` prop, or a child with a `code` prop.",
		);
	}

	return (
		<div className="group dark:bg-white/2.5">
			<CodePanelHeader tag={tag} label={label} />
			<div className="relative">
				<pre className="overflow-x-auto p-4 text-xs text-white">{children}</pre>
				<CopyButton code={code} />
			</div>
		</div>
	);
}

function CodeGroupHeader({
	title,
	children,
	selectedIndex,
}: {
	readonly title: string;
	readonly children: React.ReactNode;
	readonly selectedIndex: number;
}) {
	const hasTabs = Children.count(children) > 1;

	if (!title && !hasTabs) {
		return null;
	}

	return (
		<div className="flex min-h-[calc(theme(spacing.12)+1px)] flex-wrap items-start gap-x-4 border-b border-zinc-700 bg-zinc-800 px-4 dark:border-zinc-800 dark:bg-transparent">
			{title && (
				<h3 className="mr-auto pt-3 text-xs font-semibold text-white">
					{title}
				</h3>
			)}
			{hasTabs && (
				<TabList className="-mb-px flex gap-4 text-xs font-medium">
					{Children.map(children, (child, childIndex) => (
						<Tab
							className={clsx(
								"border-b py-3 transition ui-not-focus-visible:outline-none",
								childIndex === selectedIndex
									? "border-amber-500 text-amber-400"
									: "border-transparent text-zinc-400 hover:text-zinc-300",
							)}
						>
							{getPanelTitle(
								isValidElement(child)
									? (child.props as { title?: string; language?: string })
									: {},
							)}
						</Tab>
					))}
				</TabList>
			)}
		</div>
	);
}

function CodeGroupPanels({
	children,
	...props
}: React.ComponentPropsWithoutRef<typeof CodePanel>) {
	const hasTabs = Children.count(children) > 1;

	if (hasTabs) {
		return (
			<TabPanels>
				{Children.map(children, (child) => (
					<TabPanel>
						<CodePanel {...props}>{child}</CodePanel>
					</TabPanel>
				))}
			</TabPanels>
		);
	}

	return <CodePanel {...props}>{children}</CodePanel>;
}

function usePreventLayoutShift() {
	const positionRef = useRef<HTMLElement>(null);
	const rafRef = useRef<number | undefined>(undefined);

	useEffect(() => {
		return () => {
			if (typeof rafRef.current !== "undefined") {
				window.cancelAnimationFrame(rafRef.current);
			}
		};
	}, []);

	return {
		positionRef,
		preventLayoutShift(callback: () => void) {
			if (!positionRef.current) {
				return;
			}

			const initialTop = positionRef.current.getBoundingClientRect().top;

			callback();

			rafRef.current = window.requestAnimationFrame(() => {
				const newTop =
					positionRef.current?.getBoundingClientRect().top ?? initialTop;
				window.scrollBy(0, newTop - initialTop);
			});
		},
	};
}

const usePreferredLanguageStore = create<{
	preferredLanguages: Array<string>;
	addPreferredLanguage: (language: string) => void;
}>()((set) => ({
	preferredLanguages: [],
	addPreferredLanguage: (language) =>
		set((state) => ({
			preferredLanguages: [
				...state.preferredLanguages.filter(
					(preferredLanguage) => preferredLanguage !== language,
				),
				language,
			],
		})),
}));

function useTabGroupProps(availableLanguages: Array<string>) {
	const { preferredLanguages, addPreferredLanguage } =
		usePreferredLanguageStore();
	const [selectedIndex, setSelectedIndex] = useState(0);
	const activeLanguage = [...availableLanguages].sort(
		(a, z) => preferredLanguages.indexOf(z) - preferredLanguages.indexOf(a),
	)[0];
	const languageIndex = availableLanguages.indexOf(activeLanguage ?? "");
	const newSelectedIndex = languageIndex === -1 ? selectedIndex : languageIndex;
	if (newSelectedIndex !== selectedIndex) {
		setSelectedIndex(newSelectedIndex);
	}

	const { positionRef, preventLayoutShift } = usePreventLayoutShift();

	return {
		as: "div" as const,
		ref: positionRef,
		selectedIndex,
		onChange: (newSelectedIndex: number) => {
			preventLayoutShift(() =>
				addPreferredLanguage(availableLanguages[newSelectedIndex] ?? ""),
			);
		},
	};
}

const CodeGroupContext = createContext(false);

export function CodeGroup({
	children,
	title,
	...props
}: React.ComponentPropsWithoutRef<typeof CodeGroupPanels> & { title: string }) {
	const languages =
		Children.map(children, (child) =>
			getPanelTitle(
				isValidElement(child)
					? (child.props as { title?: string; language?: string })
					: {},
			),
		) ?? [];
	const tabGroupProps = useTabGroupProps(languages);
	const hasTabs = Children.count(children) > 1;

	const containerClassName =
		"my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10";
	const header = (
		<CodeGroupHeader title={title} selectedIndex={tabGroupProps.selectedIndex}>
			{children}
		</CodeGroupHeader>
	);
	const panels = <CodeGroupPanels {...props}>{children}</CodeGroupPanels>;

	return (
		<CodeGroupContext.Provider value>
			{hasTabs ? (
				<TabGroup {...tabGroupProps} className={containerClassName}>
					<div className="not-prose">
						{header}
						{panels}
					</div>
				</TabGroup>
			) : (
				<div className={containerClassName}>
					<div className="not-prose">
						{header}
						{panels}
					</div>
				</div>
			)}
		</CodeGroupContext.Provider>
	);
}

export function Code({
	children,
	...props
}: Readonly<React.ComponentPropsWithoutRef<"code">>) {
	const isGrouped = useContext(CodeGroupContext);

	if (isGrouped) {
		if (typeof children !== "string") {
			throw new Error(
				"`Code` children must be a string when nested inside a `CodeGroup`.",
			);
		}
		// biome-ignore lint/security/noDangerouslySetInnerHtml: safe to inject in this way
		return <code {...props} dangerouslySetInnerHTML={{ __html: children }} />; // skipcq: JS-0440
	}

	return <code {...props}>{children}</code>;
}

export function Pre({
	children,
	...props
}: React.ComponentPropsWithoutRef<typeof CodeGroup>) {
	const isGrouped = useContext(CodeGroupContext);

	if (isGrouped) {
		return children;
	}

	return <CodeGroup {...props}>{children}</CodeGroup>;
}
