"use client";

import { remToPx } from "@/utils/remToPx";
import { useAuth } from "@social/auth/provider";
import { Button } from "@social/components/docs/Button";
import { useIsInsideMobileNavigation } from "@social/components/docs/MobileNavigation";
import { useSectionStore } from "@social/components/docs/SectionProvider";
import { Tag } from "@social/components/docs/Tag";
import { Link } from "@social/ui/link";
import clsx from "clsx";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRef } from "react";

interface NavGroup {
	title: string;
	links: Array<{
		title: string;
		href: string;
	}>;
}

function useInitialValue<T>(value: T, condition = true) {
	const initialValue = useRef(value).current;
	return condition ? initialValue : value;
}

function TopLevelNavItem({
	href,
	children,
}: {
	readonly href: string;
	readonly children: React.ReactNode;
}) {
	return (
		<li className="md:hidden">
			<Link
				href={href}
				className="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
			>
				{children}
			</Link>
		</li>
	);
}

function NavLink({
	href,
	children,
	tag,
	active = false,
	isAnchorLink = false,
}: {
	readonly href: string;
	readonly children: React.ReactNode;
	readonly tag?: string;
	readonly active?: boolean;
	readonly isAnchorLink?: boolean;
}) {
	return (
		<Link
			href={href}
			aria-current={active ? "page" : undefined}
			className={clsx(
				"flex justify-between gap-2 py-1 pr-3 text-sm transition",
				isAnchorLink ? "pl-7" : "pl-4",
				active
					? "text-zinc-900 dark:text-white"
					: "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
			)}
		>
			<span className="truncate">{children}</span>
			{tag && (
				<Tag variant="small" color="zinc">
					{tag}
				</Tag>
			)}
		</Link>
	);
}

function VisibleSectionHighlight({
	group,
	pathname,
}: {
	readonly group: NavGroup;
	readonly pathname: string;
}) {
	const [sections, visibleSections] = useInitialValue(
		[
			useSectionStore((s) => s.sections),
			useSectionStore((s) => s.visibleSections),
		],
		useIsInsideMobileNavigation(),
	);

	const isPresent = useIsPresent();

	if (!sections || !visibleSections) return null;

	const firstVisibleSectionIndex = Math.max(
		0,
		[{ id: "_top" }, ...sections].findIndex(
			(section) => section.id === visibleSections[0],
		),
	);
	const itemHeight = remToPx(2);
	const height = isPresent
		? Math.max(1, visibleSections.length) * itemHeight
		: itemHeight;
	const top =
		group.links.findIndex((link) => link.href === pathname) * itemHeight +
		firstVisibleSectionIndex * itemHeight;

	return (
		<motion.div
			layout
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { delay: 0.2 } }}
			exit={{ opacity: 0 }}
			className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"
			style={{ borderRadius: 8, height, top }}
		/>
	);
}

function ActivePageMarker({
	group,
	pathname,
}: {
	readonly group: NavGroup;
	readonly pathname: string;
}) {
	const itemHeight = remToPx(2);
	const offset = remToPx(0.25);
	const activePageIndex = group.links.findIndex(
		(link) => link.href === pathname,
	);
	const top = offset + activePageIndex * itemHeight;

	return (
		<motion.div
			layout
			className="absolute left-2 h-6 w-px bg-amber-500"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { delay: 0.2 } }}
			exit={{ opacity: 0 }}
			style={{ top }}
		/>
	);
}

function NavigationGroup({
	group,
	className,
}: {
	readonly group: NavGroup;
	readonly className?: string;
}) {
	// If this is the mobile navigation then we always render the initial
	// state, so that the state does not change during the close animation.
	// The state will still update when we re-open (re-render) the navigation.
	const isInsideMobileNavigation = useIsInsideMobileNavigation();
	const [pathname, sections] = useInitialValue(
		[usePathname(), useSectionStore((s) => s.sections)],
		isInsideMobileNavigation,
	);

	const isActiveGroup =
		group.links.findIndex((link) => link.href === pathname) !== -1;

	if (!sections) return null;

	return (
		<li className={clsx("relative mt-6", className)}>
			<motion.h2
				layout="position"
				className="text-xs font-semibold text-zinc-900 dark:text-white"
			>
				{group.title}
			</motion.h2>
			<div className="relative mt-3 pl-2">
				<AnimatePresence initial={!isInsideMobileNavigation}>
					{isActiveGroup && (
						<VisibleSectionHighlight group={group} pathname={pathname} />
					)}
				</AnimatePresence>
				<motion.div
					layout
					className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
				/>
				<AnimatePresence initial={false}>
					{isActiveGroup && (
						<ActivePageMarker group={group} pathname={pathname} />
					)}
				</AnimatePresence>
				<ul className="border-l border-transparent">
					{group.links.map((link) => (
						<motion.li key={link.href} layout="position" className="relative">
							<NavLink href={link.href} active={link.href === pathname}>
								{link.title}
							</NavLink>
							<AnimatePresence mode="popLayout" initial={false}>
								{link.href === pathname && sections.length > 0 && (
									<motion.ul
										initial={{ opacity: 0 }}
										animate={{
											opacity: 1,
											transition: { delay: 0.1 },
										}}
										exit={{
											opacity: 0,
											transition: { duration: 0.15 },
										}}
									>
										{sections.map((section) => (
											<li key={section.id}>
												<NavLink
													href={`${link.href}#${section.id}`}
													tag={section.tag}
													isAnchorLink
												>
													{section.title}
												</NavLink>
											</li>
										))}
									</motion.ul>
								)}
							</AnimatePresence>
						</motion.li>
					))}
				</ul>
			</div>
		</li>
	);
}

export const navigation: Array<NavGroup> = [
	{
		title: "Guides",
		links: [
			{ title: "Introduction", href: "/docs" },
			{ title: "Quickstart", href: "/docs/quickstart" },
			{ title: "Accounts", href: "/docs/connecting-accounts" },
			{ title: "Publishing", href: "/docs/publishing" },
			{ title: "Targets", href: "/docs/targets" },
		],
	},
	{
		title: "Advanced",
		links: [{ title: "Custom OAuth", href: "/docs/credentials" }],
	},
	{
		title: "Providers",
		links: [
			{ title: "Threads", href: "/docs/providers/threads" },
			{ title: "Instagram", href: "/docs/providers/instagram" },
		],
	},
];

export function Navigation(
	props: Readonly<React.ComponentPropsWithoutRef<"nav">>,
) {
	const { status } = useAuth();

	return (
		<nav {...props}>
			<ul>
				<TopLevelNavItem href="/docs">Documentation</TopLevelNavItem>
				<TopLevelNavItem href="/help">Support</TopLevelNavItem>
				{navigation.map((group, groupIndex) => (
					<NavigationGroup
						key={group.title}
						group={group}
						className={groupIndex === 0 ? "md:mt-0" : ""}
					/>
				))}
				<li className="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
					{status === "authenticated" ? (
						<Button href="/home" variant="filled" className="w-full">
							Dashboard
						</Button>
					) : (
						<Button href="/continue" variant="filled" className="w-full">
							Sign in
						</Button>
					)}
				</li>
			</ul>
		</nav>
	);
}
