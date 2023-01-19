import { getDay } from '$lib/constants';
import { prisma } from '$lib/prisma';
import type { Video } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, cookies }) => {
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
		if (!video) {
			const videoReq = await fetch('/api/get_video');
			video = await videoReq.json();
		}
	}

	const score = await prisma.guess.count({
		where: {
			day: getDay(),
			stats_id: session?.stats_id
		}
	});

	return { video, session, score };
}) satisfies PageServerLoad;
