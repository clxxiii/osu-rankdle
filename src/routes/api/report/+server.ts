import { getDay } from '$lib/constants';
import { prisma } from '$lib/prisma';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const POST = (async ({ url, cookies }) => {
	const sessionId = cookies.get('session');
	const reason = url.searchParams.get('reason');
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

	console.log({ lastGuess, reason });

	const report = await prisma.report.create({
		data: {
			video: {
				connect: {
					id: lastGuess.video_id
				}
			},
			user: {
				connect: {
					id: lastGuess.stats_id
				}
			},
			reason: reason
		}
	});

	return json(report);
}) satisfies RequestHandler;
