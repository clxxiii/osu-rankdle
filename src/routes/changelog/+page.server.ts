import type { ServerLoad } from '@sveltejs/kit';
import { readdirSync, readFileSync } from 'fs';

export const load = (async () => {
	const articles = readdirSync('./src/routes/changelog/articles');
	const array = [];
	for (const articleName of articles) {
		const article = readFileSync(`./src/routes/changelog/articles/${articleName}`).toString();
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

function parseArticle(article: string) {
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
