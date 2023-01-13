import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import { inverse } from '$lib/exponentials';

const day0 = new Date('01/14/23');

export const GET = (async ({ url, cookies }) => {
	const day = Math.ceil((Date.now() - day0.getTime()) / (24 * 60 * 60 * 1000));
	const sessionId = cookies.get('session');
	const guess = parseInt(url.searchParams.get('input'));
	const session = await prisma.session.findUnique({
		where: { id: sessionId },
		include: {
			stats: true
		}
	});
	const video = await prisma.video.findUnique({
		where: {
			id: session.stats.current_video_id
		}
	});
	const user = await prisma.user.findUnique({
		where: {
			id: video.user_id
		},
		select: {
			id: true,
			country_code: true,
			rank: true,
			username: true
		}
	});

	const normalGuess = inverse(guess);
	const normalAnswer = inverse(video.shown_rank);

	const penalty = Math.round(Math.abs(normalAnswer - normalGuess) / 100);
	const newHP = session.stats.hp - penalty <= 0 ? 0 : session.stats.hp - penalty;

	await prisma.stats.update({
		where: {
			id: session.stats_id
		},
		data: {
			hp: newHP,
			history: {
				connectOrCreate: {
					where: {
						day_stats_id: {
							stats_id: session.stats_id,
							day
						}
					},
					create: {
						day,
						guesses: {
							create: {
								video_id: video.id,
								input: guess,
								penalty
							}
						}
					}
				}
			}
		}
	});

	return json({
		answer: video.shown_rank,
		guess,
		penalty,
		user
	});
}) satisfies RequestHandler;
