import type { ServerLoad } from '@sveltejs/kit';
import changelogs from "./changelogs.json";

type ParsedArticle = {
	data: string,
	date?: string,
	version?: string,
	title?: string
}

export const load = (async ({ fetch }) => {
	const array: ParsedArticle[] = [];
	for (const articlename of changelogs) {
		const articleReq = await fetch(`/articles/${articlename}`)
		const article = await articleReq.text();
		const parsedArticle = parseArticle(article);
		array.push(parsedArticle);
	}
	array.sort((a, b) => {
		const aDate = new Date(a.date),
			bDate = new Date(b.date);

		return bDate.getTime() - aDate.getTime();
	});
	return { articles: array };
}) satisfies ServerLoad;

function parseArticle(article: string): ParsedArticle {
	const lines = article.split('\r\n');

	const data = {};
	let lineNum = 0;
	for (const line of lines) {
		if (lineNum == 0 && line == '---') {
			lineNum++;
			continue;
		} else if (lineNum == 0 && line != '---') {
			return { data: article };
		}

		if (line == '---') {
			lineNum++;
			break;
		}

		// if (line.startsWith('date: ')) {
		// 	const point = line.split(': ');
		// 	console.log(point[1]);
		// 	data['date'] = new Date(point[1]);
		// 	break;
		// }

		const point = line.split(': ');
		data[point[0]] = point[1];
		lineNum++;
	}
	lines.splice(0, lineNum);
	if (lines[0] == '') lines.splice(0, 1);

	return { ...data, data: lines.join('\r\n') };
}
