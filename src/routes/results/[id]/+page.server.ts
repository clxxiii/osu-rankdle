import { prisma } from '$lib/prisma';
import type { ServerLoad } from '@sveltejs/kit';

export const load = (async ({ cookies }) => {
	const sessionId = cookies.get('session');
	const session = await prisma.session.findUnique({
		where: {
			id: sessionId
		}
	});
	const history = await prisma.userDay.findMany({
		where: {
			stats_id: session.stats_id
		},
		include: {
			guesses: {}
		}
	});
	return { history };
}) satisfies ServerLoad;
