import type { ServerLoad } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

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

	return { session };
}) satisfies ServerLoad;
