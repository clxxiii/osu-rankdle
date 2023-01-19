import { getDay } from '$lib/constants';
import { prisma } from '$lib/prisma';
import type { Video } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, cookies }) => {
	let video: Video | null;

	const session = await prisma.session.findUnique({
		where: {
			id: cookies.get('session')
		},
		include: {
			stats: {
				include: {
					user: true,
					current_video: true
				}
			}
		}
	});

	if (!session) {
		const videoReq = await fetch('/api/get_video');
		video = await videoReq.json();
		return;
	}

	// Get day history and see if game needs to be reset:
	const recentGame = await prisma.userDay.findUnique({
		where: {
			day_stats_id: {
				day: getDay(),
				stats_id: session?.stats_id
			}
		}
	});

	if (!recentGame) {
		session.stats = await prisma.stats.update({
			where: {
				id: session.stats_id
			},
			data: {
				hp: 2000,
				played_today: false,
				current_video: {
					disconnect: true
				},
				history: {
					create: {
						day: getDay()
					}
				}
			},
			include: {
				user: true,
				current_video: true
			}
		});
	}

	const score = await prisma.guess.count({
		where: {
			day: getDay(),
			stats_id: session?.stats_id
		}
	});
	if (!video) {
		const videoReq = await fetch('/api/get_video');
		video = await videoReq.json();

		return { video, session, score };
	}
	video = session.stats.current_video;

	return { video, session, score };
}) satisfies PageServerLoad;
