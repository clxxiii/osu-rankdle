import { prisma } from '$lib/prisma';
import { error, type ServerLoad } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const userId = parseInt(params.id);
	const user = await prisma.user.findUnique({
		where: {
			id: userId
		}
	});

	if (!user) throw error(404, 'User does not exist');

	const stats = await prisma.stats.findUnique({
		where: {
			id: user.stats_id
		}
	});

	const guesses = await prisma.guess.findMany({
		where: {
			stats_id: stats.id
		},
		select: {
			id: true,
			penalty: true,
			input: true,
			video: {
				select: {
					shown_rank: true,
					youtube_id: true
				}
			}
		},
		orderBy: {
			penalty: 'asc'
		}
	});

	const days = await prisma.userDay.findMany({
		where: {
			stats_id: stats.id
		},
		include: {
			_count: true
		},
		orderBy: {
			day: 'asc'
		}
	});

	const score = {
		best: stats.highest_score,
		total: guesses.length
	};

	return { user, score, days, guesses };
}) satisfies ServerLoad;
