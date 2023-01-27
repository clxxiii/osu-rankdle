import { prisma } from '$lib/prisma';
import { error, type ServerLoad } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const guessId = params.id;
	const guess = await prisma.guess.findUnique({
		where: {
			id: guessId
		},
		include: {
			video: {
				include: {
					user: true
				}
			},
			stats: {
				include: {
					user: true
				}
			}
		}
	});
	if (!guess) throw error(404);

	const result = {
		answer: guess.video.shown_rank,
		guess: guess.input,
		penalty: guess.penalty,
		user: guess.video.user
	};

	return { result, user: guess.stats.user, video_id: guess.video.youtube_id };
}) satisfies ServerLoad;
