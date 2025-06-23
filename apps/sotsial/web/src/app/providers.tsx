"use client";

// Hooks
import { useMounted } from "@mantine/hooks";
// Openpanel
import { OpenPanelComponent } from "@openpanel/nextjs";
// Captcha
import { Captcha, CaptchaProvider } from "@social/auth/captcha";
// Auth
import AuthProvider, { useAuth } from "@social/auth/provider";
// Themes
import { useTheme } from "next-themes";
// Nuqs
import { NuqsAdapter } from "nuqs/adapters/next/app";
// Sonner
import { Toaster as Sonner } from "sonner";

export function Providers({
	children,
}: {
	readonly children: React.ReactNode;
}) {
	const mounted = useMounted();

	if (!mounted) return null;

	return (
		<CaptchaProvider>
			<AuthProvider>
				<NuqsAdapter>{children}</NuqsAdapter>
				<Toaster />
				<AnalyticsProvider />
			</AuthProvider>
			<Captcha invisible />
		</CaptchaProvider>
	);
}

export function Toaster() {
	const { resolvedTheme } = useTheme();

	if (!resolvedTheme) return null;

	return (
		<Sonner richColors theme={resolvedTheme === "dark" ? "dark" : "light"} />
	);
}

export function AnalyticsProvider() {
	const { user } = useAuth();

	const clientId = process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID;

	if (!clientId) {
		return null;
	}

	return (
		<OpenPanelComponent
			clientId={clientId}
			profileId={user?.id ?? ""}
			trackOutgoingLinks
			trackHashChanges
			trackScreenViews
			trackAttributes
		/>
	);
}
