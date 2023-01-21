import redirects from '$lib/redirects.json';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ params }) => {
	const link = redirects.find((x) => x.path === params.r);
	throw redirect(302, link.dest);
}) satisfies RequestHandler;
