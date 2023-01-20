import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { prisma } from '$lib/prisma';

export const GET = (async ({ cookies }) => {
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

	const userId = session.stats.user.id,
		rank = session.stats.user.rank,
		username = session.stats.user.username;

	const link = `https://docs.google.com/forms/d/e/1FAIpQLSciZQRnhBvLTrxx-TBQ5a8u3u5b5vA39LLTlbSuvHqSx6OMHQ/viewform?usp=pp_url&entry.1182197083=https://osu.ppy.sh/u/${userId}&entry.2074419157=${username}&entry.743254301=${rank}`;

	throw redirect(302, link);
}) satisfies RequestHandler;
