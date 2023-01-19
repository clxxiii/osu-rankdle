import { prisma } from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ cookies }) => {
	const sessionId = cookies.get('session');
	const session = await prisma.session.findUnique({
		where: {
			id: sessionId
		}
	});
	throw redirect(302, `/results/${session.stats_id}`);
}) satisfies RequestHandler;
