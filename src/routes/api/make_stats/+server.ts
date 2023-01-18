import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/prisma';

export const GET = (async ({ cookies }) => {
	const sessionId = cookies.get('session');
	const dupeCheck = await prisma.stats.findFirst({
		where: {
			session: {
				id: sessionId
			}
		}
	});

	if (dupeCheck) return json(dupeCheck);

	const stats = await prisma.stats.create({
		data: {
			highest_score: 0,
			longest_streak: 0,
			played_today: false,
			streak: 0,
			session: {
				connectOrCreate: {
					where: {
						id: sessionId
					},
					create: {
						id: sessionId
					}
				}
			}
		}
	});
	return json(stats);
}) satisfies RequestHandler;
