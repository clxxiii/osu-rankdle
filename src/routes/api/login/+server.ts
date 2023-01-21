import { env } from '$env/dynamic/public';
import { prisma } from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import { randomInt } from 'crypto';
import type { RequestHandler } from './$types';

export const GET = (async ({ cookies, url }) => {
	const sessionId = cookies.get('session');
	let osuOauthURL = `https://osu.ppy.sh/oauth/authorize?client_id=${env.PUBLIC_OSU_CLIENT_ID}&redirect_uri=${url.origin}/api/osu_callback&response_type=code&scope=identify`;
	const state = randomInt(Math.pow(2, 16)).toString(16);

	await prisma.session.upsert({
		where: {
			id: sessionId
		},
		update: {
			state
		},
		create: {
			id: sessionId,
			state,
			stats: {
				create: {
					highest_score: 0,
					longest_streak: 0,
					played_today: false,
					streak: 0
				}
			}
		}
	});

	osuOauthURL += `&state=${state}`;
	throw redirect(302, osuOauthURL);
}) satisfies RequestHandler;
