"use client";

import { remToPx } from "@/utils/remToPx";
import { useSectionStore } from "@social/components/docs/SectionProvider";
import { Tag } from "@social/components/docs/Tag";
import { Link } from "@social/ui/link";
import { useInView } from "framer-motion";
import { type RefObject, useEffect, useRef } from "react";

function AnchorIcon(props: Readonly<React.ComponentPropsWithoutRef<"svg">>) {
	return (
		<svg
			viewBox="0 0 20 20"
			fill="none"
			strokeLinecap="round"
			aria-hidden="true"
			{...props}
		>
			<path d="m6.5 11.5-.964-.964a3.535 3.535 0 1 1 5-5l.964.964m2 2 .964.964a3.536 3.536 0 0 1-5 5L8.5 13.5m0-5 3 3" />
		</svg>
	);
}

function Eyebrow({
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
		<div className="flex items-center gap-x-3">
			{tag && <Tag>{tag}</Tag>}
			{tag && label && (
				<span className="h-0.5 w-0.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
			)}
			{label && <span className="text-xs text-zinc-400">{label}</span>}
		</div>
	);
}

function Anchor({
	id,
	inView,
	children,
}: {
	readonly id: string;
	readonly inView: boolean;
	readonly children: React.ReactNode;
}) {
	if (!id) {
		return children;
	}

	return (
		<Link
			href={`#${id}`}
			className="group text-inherit no-underline hover:text-inherit"
		>
			{inView && (
				<div className="absolute ml-[calc(-1*var(--width))] mt-1 hidden w-[var(--width)] opacity-0 transition [--width:calc(2.625rem+0.5px+50%-min(50%,calc(theme(maxWidth.lg)+theme(spacing.8))))] group-hover:opacity-100 group-focus:opacity-100 md:block lg:z-50 2xl:[--width:theme(spacing.10)]">
					<div className="group/anchor block h-5 w-5 rounded-lg bg-zinc-50 ring-1 ring-inset ring-zinc-300 transition hover:ring-zinc-500 dark:bg-zinc-800 dark:ring-zinc-700 dark:hover:bg-zinc-700 dark:hover:ring-zinc-600">
						<AnchorIcon className="h-5 w-5 stroke-zinc-500 transition dark:stroke-zinc-400 dark:group-hover/anchor:stroke-white" />
					</div>
				</div>
			)}
			{children}
		</Link>
	);
}

export function Heading<Level extends 2 | 3>({
	children,
	tag,
	label,
	level,
	anchor = true,
	...props
}: Readonly<React.ComponentPropsWithoutRef<`h${Level}`>> & {
	readonly id: string;
	readonly tag?: string;
	readonly label?: string;
	readonly level?: Level;
	readonly anchor?: boolean;
}) {
	level = level ?? (2 as Level);
	const Component = `h${level}` as "h2" | "h3";
	const ref = useRef<HTMLHeadingElement>(null);
	const registerHeading = useSectionStore((s) => s.registerHeading);

	const inView = useInView(ref, {
		margin: `${remToPx(-3.5)}px 0px 0px 0px`,
		amount: "all",
	});

	useEffect(() => {
		if (level === 2 && registerHeading) {
			registerHeading({
				id: props.id,
				ref: ref as RefObject<HTMLHeadingElement>,
				offsetRem: tag || label ? 8 : 6,
			});
		}
	}, [registerHeading, props.id, tag, label, level]);

	return (
		<>
			<Eyebrow tag={tag} label={label} />
			<Component
				ref={ref}
				className={tag || label ? "mt-2 scroll-mt-32" : "scroll-mt-24"}
				{...props}
			>
				{anchor ? (
					<Anchor id={props.id} inView={inView}>
						{children}
					</Anchor>
				) : (
					children
				)}
			</Component>
		</>
	);
}
