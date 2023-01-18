import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import { inverse } from '$lib/constants';
import { getDay } from '$lib/constants';

export const GET = (async ({ fetch, url, cookies }) => {
	const day = getDay();
	const sessionId = cookies.get('session');
	const input = parseInt(url.searchParams.get('input'));
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

	const normalGuess = inverse(input);
	const normalAnswer = inverse(video.shown_rank);

	const penalty = Math.round(Math.abs(normalAnswer - normalGuess) / 100);
	const newHP = session.stats.hp - penalty <= 0 ? 0 : session.stats.hp - penalty;

	const newVideoReq = await fetch('/api/get_video?new=true');
	const newVideo = await newVideoReq.json();

	const stats = await prisma.stats.update({
		where: {
			id: session.stats_id
		},
		data: {
			hp: newHP,
			current_video: {
				connect: {
					id: newVideo.id
				}
			},
			history: {
				connectOrCreate: {
					where: {
						day_stats_id: {
							stats_id: session.stats_id,
							day
						}
					},
					create: {
						day
					}
				}
			}
		}
	});

	const guessCount = await prisma.guess.count({
		where: {
			day: getDay(),
			stats_id: stats.id
		}
	});

	await prisma.guess.create({
		data: {
			on_day: {
				connect: {
					day_stats_id: {
						day,
						stats_id: stats.id
					}
				}
			},
			stats: {
				connect: {
					id: stats.id
				}
			},
			input,
			penalty,
			guess_num: guessCount + 1,
			video: {
				connect: {
					id: video.id
				}
			}
		}
	});

	return json({
		answer: video.shown_rank,
		guess: input,
		penalty,
		user
	});
}) satisfies RequestHandler;
