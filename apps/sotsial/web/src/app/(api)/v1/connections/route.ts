import { getSotsial } from "@/config/sotsial";
import { getAccounts } from "@/utils/accounts/get-accounts";
import { getCredentials } from "@/utils/credentials/get";
import { createSupaClient } from "@/utils/supabase/supa";
import { authorise } from "@social/auth/authorise";
import { encrypt, timestamp } from "sotsial/utils";

const deleteConnection = async (request: Request) => {
	const { valid, userId } = await authorise(request);
	const url = new URL(request.url);

	if (!valid || !userId) {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	const supa = createSupaClient();

	// Delete if the user has access to it
	const { error } = await supa
		.from("connections")
		.delete()
		.eq("id", url.searchParams.get("id"))
		.eq("user_id", userId);

	if (error) {
		return Response.json({ error: error.message }, { status: 400 });
	}

	return Response.json(
		{
			data: {
				message: "Deleted connection",
			},
		},
		{ status: 200 },
	);
};

const listConnections = async (request: Request) => {
	const { valid, userId } = await authorise(request);

	const url = new URL(request.url);

	if (!valid || !userId) {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	const options = {
		platform: url.searchParams.get("platform") ?? undefined,
		query: url.searchParams.get("query") ?? undefined,
		tags: JSON.parse(url.searchParams.get("tags") ?? "[]"),
	};

	const pagination = {
		page: Number(url.searchParams.get("page") ?? 1),
		limit: Number(url.searchParams.get("limit") ?? 10),
	};

	const supa = createSupaClient();

	const search = supa
		.from("connections")
		.select(
			"id, created_at, credential, platform, account_id, expiry, tags, account",
		)
		.eq("user_id", userId);

	if (options.platform) {
		search.eq("platform", options.platform);
	}

	if (options.query) {
		search
			.ilike("account->>name", `%${options.query}%`)
			.ilike("account->>username", `%${options.query}%`);
	}

	if (options.tags.length > 0) {
		search.overlaps("tags", options.tags);
	}

	const { data, error } = await search.range(
		(pagination.page - 1) * pagination.limit,
		pagination.page * pagination.limit - 1,
	);

	if (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}

	return Response.json({ data }, { status: 200 });
};

/**
 * Get a grant URL for a given platform
 *
 * Users won't be able to use this API to connect to Sotsial's providers
 * unless they're using their own OAuth credentials or are connecting
 * via the dashboard.
 *
 * @param request - The request object
 *
 * @returns The response
 */
const createConnection = async (request: Request) => {
	// Verify the API key or Session
	const { valid, userId, type } = await authorise(request);

	if (!valid || !userId) {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	const url = new URL(request.url);

	const {
		platform,
		redirect,
		tags: tagsParam,
		credential: credentialParam,
	} = Object.fromEntries(url.searchParams.entries());

	let credential = null;

	if (credentialParam) {
		const results = await getCredentials(credentialParam, {
			userId,
		});

		if (results.length > 0) {
			credential = results[0];
		}
	}

	// Users are only allowed to use the grant API if they have provided a credential
	// This is to prevent abuse.
	if (!credential && type === "api") {
		return Response.json(
			{
				error:
					"You cannot use the API to generate a grant URL for Sotsial's providers.",
				hint:
					"See the docs for more information: https://sotsial.com/docs/credentials#sotsial-providers",
			},
			{ status: 400 },
		);
	}

	if (!platform) {
		return Response.json({ error: "Platform is required" }, { status: 400 });
	}

	const sotsial = getSotsial({
		platforms: [
			{
				platform,
				credential,
			},
		],
	});

	const provider = sotsial.providers.find((p) => p === platform) ?? null;

	if (!provider) {
		return Response.json({ error: "Provider not found" }, { status: 404 });
	}

	const { data, error } = await sotsial[provider].grant();

	if (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}

	if (!data) {
		return Response.json(
			{
				error: "Failed to get redirect URL",
			},
			{
				status: 500,
			},
		);
	}

	const tags = tagsParam ? tagsParam.split(",") : [];

	const supa = createSupaClient();

	const { data: grantData, error: grantError } = await supa
		.from("grants")
		.insert({
			expiry: timestamp(60 * 60),
			platform,
			csrf_token: await encrypt(data.csrf_token, {
				secret: process.env.ENCRYPTION_KEY,
			}),
			user_id: userId,
			tags,
		})
		.select("id")
		.single();

	if (grantError) {
		return Response.json({ error: grantError.message }, { status: 500 });
	}

	const response = Response.json(
		{
			url: data.url,
			token: `${grantData.id}|${data.csrf_token}`,
		},
		{
			status: 200,
		},
	);

	response.headers.append(
		"Set-Cookie",
		`sotsial=${grantData.id}|${data.csrf_token}|${
			redirect ?? ""
		}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600`,
	);

	return response;
};

/**
 * Update any matching connections based on the targets field.
 *
 * @param request - The request object
 *
 * @returns The response
 */
const updateConnection = async (request: Request) => {
	const { valid, userId } = await authorise(request);

	if (!valid || !userId) {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	const {
		credentials: credentialIds = [],
		targets = [],
		tags = [],
	} = await request.json().catch(() => ({})) as {
		credentials?: string[];
		targets?: string[];
		tags?: string[];
	};

	const { data: accounts, error: accountsError } = await getAccounts({
		targets,
		credentialIds,
		userId,
	});

	if (accountsError) {
		return Response.json(
			{ error: "Failed to get accounts" },
			{ status: 400 },
		);
	}

	const supa = createSupaClient();

	const { error, data: updated } = await supa
		.from("connections")
		.update({ tags })
		.in(
			"id",
			accounts.map((account) => account.id),
		)
		.select("id");

	if (error) {
		return Response.json(
			{ status: "error", error: error.message },
			{ status: 500 },
		);
	}

	return Response.json(
		{ status: "success", updated: updated.length },
		{ status: 200 },
	);
};

export const GET = listConnections;
export const POST = createConnection;
export const PATCH = updateConnection;
export const DELETE = deleteConnection;
