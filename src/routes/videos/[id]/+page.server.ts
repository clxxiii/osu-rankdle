import { prisma } from '$lib/prisma';
import type { Guess, Report, Video } from '@prisma/client';
import { redirect, type ServerLoad } from '@sveltejs/kit';

type Data = {
	video: Video;
	guesses: {
		input: number;
		penalty: number;
		stats: {
			user: {
				id: number;
				username: string;
				rank: number;
			};
		};
	}[];
	reports?: Report[];
};

export const load = (async ({ params, cookies }) => {
	const videoId = params.id;
	const sessionId = cookies.get('session');
	const session = await prisma.session.findUnique({
		where: {
			id: sessionId
		}
	});
	const video = await prisma.video.findUnique({
		where: {
			id: videoId
		},
		include: {
			user: true
		}
	});
	const loggedInUser = await prisma.user.findFirst({
		where: {
			stats: {
				sessions: {
					some: {
						id: session.id
					}
				}
			}
		}
	});

	// Check if user is allowed to see this page
	if (!(video.user_id === loggedInUser.id || loggedInUser.admin)) {
		throw redirect(302, '/');
	}

	const guesses = await prisma.guess.findMany({
		where: {
			video: {
				id: video.id
			}
		},
		select: {
			input: true,
			penalty: true,
			stats: {
				select: {
					user: {
						select: {
							id: true,
							username: true,
							rank: true
						}
					}
				}
			}
		}
	});
	const data: Data = { video, guesses };

	if (loggedInUser.admin) {
		data.reports = await prisma.report.findMany({
			where: {
				video_id: videoId
			},
			include: {
				user: {
					select: {
						user: {
							select: {
								username: true,
								id: true,
								rank: true
							}
						}
					}
				}
			}
		});
	}

	return data;
}) satisfies ServerLoad;
