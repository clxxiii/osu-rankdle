import redirects from '$lib/redirects.json';
import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => {
	const paths = redirects.map((x) => x.path);
	return paths.includes(param);
}) satisfies ParamMatcher;
