import { prisma } from '$lib/prisma';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	let sessionId = event.cookies.get('session');
	if (!sessionId) {
		const session = await prisma.session.create({
			data: {
				stats: {
					create: {
						played_today: false,
						highest_score: 0,
						longest_streak: 0,
						streak: 0
					}
				}
			}
		});
		sessionId = session.id;
		event.cookies.set('session', sessionId);
	}
	const response = await resolve(event);
	return response;
}) satisfies Handle;
