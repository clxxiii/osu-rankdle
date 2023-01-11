import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, cookies }) => {
	const firstVideo = await fetch('/api/get_video');
	const videoData = await firstVideo.json();

	const session = await prisma.session.findUnique({
		where: {
			id: cookies.get('session')
		},
		include: {
			stats: true
		}
	});
	return { video: videoData.youtube_id, session };
}) satisfies PageServerLoad;
