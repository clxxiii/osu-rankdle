import { prisma } from '$lib/prisma';
import type { ServerLoad } from '@sveltejs/kit';

export const load = (async ({ cookies, url }) => {
	const page = url.searchParams.get('page') ? parseInt(url.searchParams.get('page')) : 1;

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
			},
			take: 30,
			skip: 30 * (page - 1)
		});

		const allvideos = (
			await prisma.video.findMany({
				where: {
					NOT: {
						id: 'this user has watched all videos'
					}
				},
				select: {
					id: true
				}
			})
		).length;
		const max = Math.ceil(allvideos / 30);
		return { videos, user: 'admin', page, max };
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
		},
		take: 30,
		skip: 30 & (page - 1)
	});

	const max = (
		await prisma.video.findMany({
			where: {
				user: {
					id: session.stats.user.id
				}
			},
			select: {
				id: true
			}
		})
	).length;

	return { videos, user: 'default', page, max };
}) satisfies ServerLoad;
