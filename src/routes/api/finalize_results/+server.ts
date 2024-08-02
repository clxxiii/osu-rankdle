import { prisma } from '$lib/prisma';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDay } from '$lib/constants';
import { logger } from '$lib/logger';

export const GET = (async ({ cookies }) => {
	const sessionId = cookies.get('session');

	const session = await prisma.session.findUnique({ where: { id: sessionId } });

	let stats = await prisma.stats.findUnique({
		where: {
			id: session.stats_id
		}
	});

	const day = await prisma.userDay.findUnique({
		where: {
			day_stats_id: {
				day: getDay(),
				stats_id: stats.id
			}
		},
		include: {
			guesses: true
		}
	});

	const lastDay = await prisma.userDay.findUnique({
		where: {
			day_stats_id: {
				day: getDay() - 1,
				stats_id: stats.id
			}
		}
	});

	let { streak, longest_streak, highest_score } = stats;

	if (!lastDay) streak = 1;
	if (lastDay) streak = streak + 1;
	if (streak > longest_streak) longest_streak = streak;
	if (day.guesses.length > highest_score) highest_score = day.guesses.length;

	stats = await prisma.stats.update({
		where: {
			id: stats.id
		},
		data: {
			streak,
			longest_streak,
			highest_score,
			played_today: true,
			history: {
				connectOrCreate: {
					where: {
						day_stats_id: {
							day: getDay(),
							stats_id: session.stats_id
						}
					},
					create: {
						day: getDay()
					}
				}
			}
		},
		include: {
			history: {
				where: {
					day: getDay()
				}
			}
		}
	});

	logger.info(`${stats.id} `, { ...stats, score: day.guesses.length })
	return json({ ...stats, score: day.guesses.length });
}) satisfies RequestHandler;
