import { prisma } from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ cookies }) => {
	const sessionId = cookies.get('session');

	await prisma.session.delete({
		where: {
			id: sessionId
		}
	});
	cookies.delete('session', {
		path: '/'
	});

	throw redirect(302, '/');
}) satisfies RequestHandler;
