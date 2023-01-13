import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/prisma';

export const GET = (async ({ cookies }) => {
	const sessionId = cookies.get('session');
	const session = await prisma.session.findUnique({
		where: { id: sessionId },
		include: {
			stats: true
		}
	});
	if (session.stats.current_video_id) {
		const video = await prisma.video.findUnique({
			where: {
				id: session.stats.current_video_id
			}
		});

		return json(video);
	}
	const videos = await prisma.video.findMany({
		where: {
			NOT: {
				watched_by: {
					some: {
						stats_id: session.stats_id
					}
				}
			}
		}
	}); // TODO: Filter out videos this user has seen
	const rand = Math.floor(Math.random() * videos.length);
	const video = videos[rand];

	await prisma.stats.update({
		where: {
			id: session.stats_id
		},
		data: {
			current_video_id: video.id
		}
	});

	delete video.shown_rank;
	delete video.user_id;

	return json(video);
}) satisfies RequestHandler;
