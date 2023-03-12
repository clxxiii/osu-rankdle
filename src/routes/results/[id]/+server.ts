import { prisma } from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const GET = (async ({ params }) => {
	const stats_id = params.id;
	const user = await prisma.user.findUnique({
		where: {
			stats_id: stats_id
		}
	});

	throw redirect(302, `/u/${user.id}`);
}) satisfies RequestHandler;
