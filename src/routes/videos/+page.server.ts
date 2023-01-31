import { prisma } from '$lib/prisma';
import type { ServerLoad } from '@sveltejs/kit';

export const load = (async ({ cookies }) => {
	const sessionId = cookies.get('session');
	const session = await prisma.session.findUnique({
		where: {
			id: sessionId
		},
		include: {
			stats: {
				include: {
					user: true
				}
			}
		}
	});

	if (!session.stats.user) {
		return { user: false };
	}

	if (session?.stats?.user?.admin) {
		const videos = await prisma.video.findMany({
			where: {
				NOT: {
					id: 'this user has watched all videos'
				}
			},
			include: {
				guesses_for: {
					select: {
						stats_id: true
					}
				},
				reports: true,
				user: true
			}
		});
		return { videos, user: 'admin' };
	}

	const videos = await prisma.video.findMany({
		where: {
			user: {
				id: session.stats.user.id
			},
			NOT: {
				id: 'this user has watched all videos'
			}
		},
		include: {
			guesses_for: {
				select: {
					stats_id: true
				}
			},
			user: true
		}
	});

	return { videos, user: 'default' };
}) satisfies ServerLoad;
