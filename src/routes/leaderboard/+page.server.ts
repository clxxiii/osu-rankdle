import { prisma } from '$lib/prisma';
import type { PageServerLoad } from '../$types';

export const load = (async ({ url }) => {
	const page = url.searchParams.has('page') ? parseInt(url.searchParams.get('page')) : 1;

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
		orderBy: {
			guesses: {
				_count: 'desc'
			}
		},
		take: 100,
		skip: 100 * (page - 1)
	});

	return { lb, page };
}) satisfies PageServerLoad;
