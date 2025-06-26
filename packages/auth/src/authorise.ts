import { auth } from "@social/auth/server";

export async function authorise(request: Request): Promise<{
	type: "api" | "session";
	valid: boolean;
	userId: string | null;
}> {
	if (request.headers.get("x-api-key")) {
		const { valid, key } = await auth.api.verifyApiKey({
			body: {
				key: request.headers.get("x-api-key") ?? "",
			},
		});

		return {
			type: "api",
			valid: !!key?.userId && valid,
			userId: valid && key?.userId ? key.userId : null,
		};
	}

	const userData = await auth.api.getSession({
		headers: request.headers,
	});

	return {
		type: "session",
		valid: !!userData?.user?.id,
		userId: userData?.user?.id ?? null,
	};
}
