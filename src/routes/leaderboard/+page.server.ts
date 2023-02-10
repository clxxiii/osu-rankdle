import { prisma } from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load = (async ({ url }) => {
	const page = url.searchParams.has('page') ? parseInt(url.searchParams.get('page')) : 1;

	if (page < 1) {
		throw redirect(302, `/leaderboard?page=${page}`);
	}

	const lb = await prisma.stats.findMany({
		select: {
			_count: true,
			user: true,
			history: {
				select: {
					day: true
				},
				orderBy: {
					day: 'asc'
				},
				take: 1
			}
		},
		where: {
			user: {
				username: {
					not: undefined
				}
			},
			history: {
				some: {
					day: {
						not: undefined
					}
				}
			},
			guesses: {
				some: {
					id: {
						not: undefined
					}
				}
			},
			AND: [
				{
					user: {
						removed_from_global_leaderboard: false
					}
				},
				{
					user: {
						admin: false
					}
				}
			]
		},
		orderBy: {
			guesses: {
				_count: 'desc'
			}
		},
		take: 100,
		skip: 100 * (page - 1)
	});

	const rows = await prisma.stats.count({
		where: {
			user: {
				username: {
					not: undefined
				}
			},
			guesses: {
				some: {
					id: {
						not: undefined
					}
				}
			},
			history: {
				some: {
					day: {
						not: undefined
					}
				}
			},
			AND: [
				{
					user: {
						removed_from_global_leaderboard: false
					}
				},
				{
					user: {
						admin: false
					}
				}
			]
		}
	});

	const max = Math.floor(rows / 100) + 1;

	if (page > max) {
		throw redirect(302, '/leaderboard?page=' + max);
	}
	return { lb, page, max };
}) satisfies PageServerLoad;
