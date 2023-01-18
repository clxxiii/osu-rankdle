import { getDay } from '$lib/constants';
import { prisma } from '$lib/prisma';
import type { Video } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
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
	let video: Video | null;

	if (session) {
		video = session.stats.current_video;
		delete video.shown_rank;
		delete video.user_id;
	}

	const score = await prisma.guess.count({
		where: {
			day: getDay(),
			stats_id: session.stats_id
		}
	});

	return { video, session, score };
}) satisfies PageServerLoad;
