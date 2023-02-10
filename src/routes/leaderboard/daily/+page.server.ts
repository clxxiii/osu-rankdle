import { getDay } from '$lib/constants';
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
					day: true,
					_count: true
				},
				orderBy: {
					day: 'asc'
				}
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
					day: getDay()
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
					day: getDay()
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

	lb.sort((a, b) => {
		const day = getDay();
		let aDay = a.history.find((x) => x.day == day);
		let bDay = b.history.find((x) => x.day == day);

		return bDay._count.guesses - aDay._count.guesses;
	});

	const max = Math.floor(rows / 100) + 1;

	if (page > max) {
		throw redirect(302, '/leaderboard?page=' + max);
	}
	return { lb, page, max };
}) satisfies PageServerLoad;
