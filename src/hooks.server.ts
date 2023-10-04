import { v4 as uuidv4 } from 'uuid';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	let sessionId = event.cookies.get('session');
	if (!sessionId) {
		sessionId = uuidv4();
		event.cookies.set('session', sessionId, { path: '/', maxAge: 60 * 60 * 24 * 365 });
	}
	const response = await resolve(event);
	return response;
}) satisfies Handle;
