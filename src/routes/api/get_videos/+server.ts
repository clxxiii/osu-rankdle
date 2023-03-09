import type { RequestHandler } from '../$types';
import { env } from '$env/dynamic/private';
import { error, json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

export const GET = (async ({ url }) => {
	const banchoAPIKey = url.searchParams.get('key');

	if (env.BANCHO_API_KEY != banchoAPIKey) throw error(403);

	const videos = await prisma.video.findMany({
		select: {
			id: true
		}
	});

	return json(videos.map((x) => x.id));
}) satisfies RequestHandler;
