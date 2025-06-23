"use client";

import {
	AuthCheckpointLoading,
	AuthCheckpointRedirecting,
} from "@social/auth/components/auth-checkpoint";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./provider";

export default function AuthCheckpoint({
	children,
	ifAuthenticated,
	ifUnauthenticated,
}: Readonly<{
	children: React.ReactNode;
	ifAuthenticated?: string;
	ifUnauthenticated?: string;
}>) {
	const router = useRouter();
	const { status } = useAuth();

	useEffect(() => {
		if (status === "loading") return;

		if (status === "authenticated") {
			if (ifAuthenticated) router.push(ifAuthenticated);
		}

		if (status === "unauthenticated") {
			if (ifUnauthenticated) router.push(ifUnauthenticated);
		}
	}, [status, ifAuthenticated, ifUnauthenticated, router]);

	if (status === "loading") return <AuthCheckpointLoading />;

	if (status === "authenticated" && ifAuthenticated) {
		return <AuthCheckpointRedirecting />;
	}

	if (status === "unauthenticated" && ifUnauthenticated) {
		return <AuthCheckpointRedirecting />;
	}

	return children;
}
