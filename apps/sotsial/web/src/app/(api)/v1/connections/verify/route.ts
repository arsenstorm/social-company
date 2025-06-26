import { createSupaClient } from "@/utils/supabase/supa";
import { authorise } from "@social/auth/authorise";

/**
 * Get the verification status of a grant
 *
 * @param request - The request object
 *
 * @returns The response
 */
const getVerificationStatus = async (request: Request) => {
	const { valid, userId } = await authorise(request);

	if (!valid || !userId) {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	const url = new URL(request.url);

	const grantId = url.searchParams.get("id");

	if (!grantId) {
		return Response.json(
			{ error: "No grant ID provided" },
			{ status: 400 },
		);
	}

	const supa = createSupaClient();

	const { data, error } = await supa
		.from("grants")
		.select("user_id, status")
		.eq("id", grantId)
		.eq("user_id", userId)
		.maybeSingle();

	if (error) {
		console.error(error);
		return Response.json(
			{ error: "Something went wrong" },
			{ status: 500 },
		);
	}

	if (!data) {
		return Response.json({ error: "Invalid grant ID" }, { status: 404 });
	}

	return Response.json({
		status: data.status,
	});
};

export const GET = getVerificationStatus;
