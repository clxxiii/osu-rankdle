import { prisma } from '$lib/prisma';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { env } from '$env/dynamic/private';
const users = {};

export const GET = (async ({ url }) => {
	const banchoAPIKey = url.searchParams.get('key');
	const youtubeId = url.searchParams.get('yt_id');
	const userId = parseInt(url.searchParams.get('user'));
	const rank = parseInt(url.searchParams.get('rank'));

	if (env.BANCHO_API_KEY != banchoAPIKey) throw error(403);

	const duplicateCheck = await prisma.video.findFirst({
		where: { youtube_id: youtubeId }
	});

	if (duplicateCheck) return new Response('Video Already Exists');

	const userData = await getUser(userId, banchoAPIKey);

	console.log(userData);
	await prisma.user.upsert({
		where: {
			id: userId
		},
		create: {
			id: userId,
			country_code: userData.country_code,
			username: userData.username,
			rank: parseInt(userData.rank)
		},
		update: {
			country_code: userData.country,
			username: userData.username,
			rank: parseInt(userData.rank),
			last_stats_update: new Date()
		}
	});

	await prisma.video.create({
		data: {
			youtube_id: youtubeId,
			shown_rank: rank,
			user_id: userId
		}
	});

	return new Response();
}) satisfies RequestHandler;

async function getUser(id: number, key: string) {
	if (users[id]) return users[id];

	let user = await prisma.user.findUnique({
		where: {
			id
		}
	});

	if (user) {
		users[id] = user;
		return user;
	}

	await new Promise((resolve) => setTimeout(resolve, 1000));
	const userReq = await fetch(`https://osu.ppy.sh/api/get_user?k=${key}&u=${id}`);
	const userData = await userReq.json();

	user = await prisma.user.create({
		data: {
			id,
			country_code: userData[0].country,
			username: userData[0].username,
			rank: parseInt(userData[0].pp_rank)
		}
	});

	users[id] = user;
	return user;
}
