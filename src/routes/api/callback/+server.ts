import type { RequestHandler } from './$types';
import { prisma } from '$lib/prisma';
import { env } from '$env/dynamic/private';
import { env as pub } from '$env/dynamic/public';
import { safe_not_equal } from 'svelte/internal';
import { error, redirect } from '@sveltejs/kit';

const auth_url = 'https://osu.ppy.sh/oauth/token';
const base_url = 'https://osu.ppy.sh/api/v2';

export const GET = (async ({ cookies, url }) => {
	const code = url.searchParams.get('code');
	const sessionId = cookies.get('session');

	const session = await prisma.session.findUnique({
		where: {
			id: sessionId
		}
	});

	if (safe_not_equal(session.state, url.searchParams.get('state'))) {
		throw error(403, 'Recieved state does not match expected state');
	}

	const tokenBody = {
		client_id: pub.PUBLIC_OSU_CLIENT_ID,
		client_secret: env.OSU_CLIENT_SECRET,
		code,
		grant_type: 'authorization_code',
		redirect_uri: `${url.origin}/api/callback`
	};

	const tokenReq = await fetch(auth_url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify(tokenBody)
	});
	const token = await tokenReq.json();

	const userReq = await fetch(`${base_url}/me`, {
		headers: {
			Authorization: `${token.token_type} ${token.access_token}`
		}
	});
	const userData = await userReq.json();

	const user = await prisma.user.upsert({
		where: {
			id: userData.id
		},
		create: {
			country_code: userData.country_code,
			id: userData.id,
			rank: userData.statistics.global_rank,
			username: userData.username,
			oauth: {
				connectOrCreate: {
					where: {
						user_id: userData.id
					},
					create: {
						access_token: token.access_token,
						expires_in: new Date(Date.now() + token.expires_in * 1000),
						refresh_token: token.refresh_token,
						token_type: token.token_type
					}
				}
			},
			stats: {
				connectOrCreate: {
					where: {
						id: session.stats_id
					},
					create: {
						highest_score: 0,
						longest_streak: 0,
						played_today: false,
						streak: 0
					}
				}
			}
		},
		update: {
			country_code: userData.country_code,
			id: userData.id,
			rank: userData.statistics.global_rank,
			username: userData.username,
			oauth: {
				connectOrCreate: {
					where: {
						user_id: userData.id
					},
					create: {
						access_token: token.access_token,
						expires_in: new Date(Date.now() + token.expires_in * 1000),
						refresh_token: token.refresh_token,
						token_type: token.token_type
					}
				}
			}
		}
	});

	await prisma.session.update({
		where: {
			id: session.id
		},
		data: {
			stats: {
				connect: {
					id: user.stats_id
				}
			}
		}
	});
	throw redirect(301, '/');
}) satisfies RequestHandler;
