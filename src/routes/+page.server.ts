import { prisma } from '$lib/prisma';
import type { Video } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, cookies }) => {
	const session = await prisma.session.findUnique({
		where: {
			id: cookies.get('session')
		},
		include: {
			stats: true
		}
	});
	let video: Video | null;
	if (session) {
		const videoReq = await fetch('/api/get_video');
		video = await videoReq.json();
		delete video.shown_rank;
		delete video.user_id;
	}
	return { video, session };
}) satisfies PageServerLoad;
