import { getDay } from '$lib/constants';
import { prisma } from '$lib/prisma';
import type { RequestHandler } from '../$types';

export const POST = (async ({ url, cookies }) => {
	const sessionId = cookies.get('session');
	const session = await prisma.session.findUnique({
		where: { id: sessionId },
		include: { stats: true }
	});

	const lastGuess = await prisma.guess.findFirst({
		where: {
			stats_id: session.stats_id,
			day: getDay()
		},
		orderBy: {
			time: 'desc'
		}
	});

	return new Response('');
}) satisfies RequestHandler;
