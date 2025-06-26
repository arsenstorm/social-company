"use client";

import { auth } from "@social/auth/client";
import { Switch } from "@social/ui/switch";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function KeyStatusToggle({
	id,
	enabled,
}: {
	id: string;
	enabled: boolean;
	refreshOnToggle?: boolean;
}) {
	const [disabled, setDisabled] = useState(false);
	const [status, setStatus] = useState(enabled ? "enabled" : "disabled");
	const router = useRouter();

	return (
		<Switch
			color="lime"
			disabled={disabled}
			checked={status === "enabled"}
			onChange={async (status) => {
				async function updateKeyStatus() {
					setDisabled(true);

					await auth.apiKey.update({
						keyId: id,
						enabled: status,
					});

					setDisabled(false);
					setStatus(status ? "enabled" : "disabled");

					router.refresh();
				}
				toast.promise(updateKeyStatus, {
					loading: `${enabled ? "Disabling" : "Enabling"} key...`,
					success: `${enabled ? "Disabled" : "Enabled"} key successfully!`,
					error: `Failed to ${enabled ? "disable" : "enable"} key.`,
				});
			}}
		/>
	);
}
