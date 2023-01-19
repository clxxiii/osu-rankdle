import type { RequestHandler } from './$types';
import { writeFileSync } from 'fs';

export const POST = (async ({ request }) => {
	const values = await request.formData();

	const fileData = values.get('mp4') as File;
	const file = await fileData.text();

	writeFileSync('test.png', file);

	return new Response('');
}) satisfies RequestHandler;
