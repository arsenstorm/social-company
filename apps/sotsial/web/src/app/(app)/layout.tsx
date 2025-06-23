import AuthCheckpoint from "@social/auth/checkpoint";
import { NavigationProvider } from "@social/components/layout/navigation";

export default function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthCheckpoint ifUnauthenticated="/continue">
			<NavigationProvider>{children}</NavigationProvider>
		</AuthCheckpoint>
	);
}
