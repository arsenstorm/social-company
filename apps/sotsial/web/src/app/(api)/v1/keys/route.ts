import { authorise } from "@social/auth/authorise";
import { auth } from "@social/auth/server";

const listKeys = async (request: Request) => {
	const { valid, userId, type } = await authorise(request);

	// Deny requests from API keys - This is a dashboard only API
	if (!valid || !userId || type === "api") {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	const keys = await auth.api.listApiKeys({
		query: {
			userId,
		},
	});

	return Response.json(keys);
};

const createKey = async (request: Request) => {
	const { valid, userId, type } = await authorise(request);

	// Deny requests from API keys - This is a dashboard only API
	if (!valid || !userId || type === "api") {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { name } = await request.json();

	const key = await auth.api.createApiKey({
		body: {
			userId,
			name,
		},
	});

	return Response.json(key);
};

const deleteKey = async (request: Request) => {
	const { valid, userId, type } = await authorise(request);

	const url = new URL(request.url);

	// Deny requests from API keys - This is a dashboard only API
	if (!valid || !userId || type === "api") {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	const id = url.searchParams.get("id");

	if (!id) {
		return Response.json({ error: "No key ID provided" }, { status: 400 });
	}

	try {
		const { success } = await auth.api.deleteApiKey({
			body: {
				keyId: id,
			},
			headers: request.headers,
		});

		if (!success) {
			return Response.json(
				{ error: "Failed to delete key" },
				{ status: 400 },
			);
		}

		return Response.json(
			{
				data: {
					message: "Key deleted",
				},
			},
			{ status: 200 },
		);
	} catch (error) {
		return Response.json(
			{ error: "Failed to delete key" },
			{ status: 500 },
		);
	}
};

export const GET = listKeys;
export const POST = createKey;
export const DELETE = deleteKey;
