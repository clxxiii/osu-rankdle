import { prisma } from '$lib/prisma';
import type { PageServerLoad } from '../$types';

export const load = (async ({ url }) => {
	const page = url.searchParams.get('page') ?? 1;

	const lb = await prisma.stats.findMany({
		include: {
			history: {
				include: {
					_count: true
				}
			}
		}
	});
	console.log(lb[0].history[0]._count);

	return {};
}) satisfies PageServerLoad;
