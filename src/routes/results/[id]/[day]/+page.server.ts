import { prisma } from '$lib/prisma';
import type { ServerLoad } from '@sveltejs/kit';

export const load = (async ({ params, cookies }) => {
	const stats_id = params.id;
	const session_id = cookies.get('session');
	const session = await prisma.session.findUnique({
		where: {
			id: session_id
		}
	});

	const stats = await prisma.stats.findUnique({
		where: {
			id: stats_id
		}
	});
	const day = await prisma.userDay.findUnique({
		where: {
			day_stats_id: {
				day: parseInt(params.day),
				stats_id: stats.id
			}
		},
		include: {
			guesses: {
				include: {
					video: true
				}
			}
		}
	});

	if (session.stats_id != stats.id) {
		const user = await prisma.user.findUnique({
			where: {
				stats_id: stats.id
			}
		});
		return { day, stats_id, user };
	}
	return { day, stats_id };
}) satisfies ServerLoad;
