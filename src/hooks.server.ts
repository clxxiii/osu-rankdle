import { v4 as uuidv4 } from 'uuid';
import type { Handle } from '@sveltejs/kit';
import { logger } from '$lib/logger';

export const handle = (async ({ event, resolve }) => {
	let sessionId = event.cookies.get('session');
	if (!sessionId) {
		sessionId = uuidv4();
		event.cookies.set('session', sessionId, { path: '/', maxAge: 60 * 60 * 24 * 365 });
	}
	logger.http(`${event.request.method}: ${event.request.url}${sessionId ? ' (' + sessionId + ')' : ''}`)
	const response = await resolve(event);
	return response;
}) satisfies Handle;
