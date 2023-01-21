import { prisma } from '$lib/prisma';
import { redirect, type ServerLoad } from '@sveltejs/kit';

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

	return { video, guesses, admin: loggedInUser.admin };
}) satisfies ServerLoad;
