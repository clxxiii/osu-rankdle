import { prisma } from './prisma.js';

const newData = `
`;
const banchoAPIKey = ``;

const userReqLink = `https://osu.ppy.sh/api/get_user?k=${banchoAPIKey}&u=`;

const users = {};

const data = newData
	.split('\n')
	.filter((x) => x != '')
	.map((x) => {
		const split = x.split('\t');
		return { youtube_id: split[0], user_id: parseInt(split[1]), rank: parseInt(split[2]) };
	});

addVideos(data);

async function addVideos(data) {
	for (const video of data) {
		console.log(video);

		let duplicateCheck = await prisma.video.findFirst({ where: { youtube_id: video.youtube_id } });
		if (duplicateCheck) continue;

		let userData = await getUser(video.user_id);

		console.log(userData);
		await prisma.user.upsert({
			where: {
				id: video.user_id
			},
			create: {
				id: video.user_id,
				country_code: userData.country,
				username: userData.username,
				rank: parseInt(userData.pp_rank)
			},
			update: {
				country_code: userData.country,
				username: userData.username,
				rank: parseInt(userData.pp_rank),
				last_stats_update: new Date()
			}
		});

		await prisma.video.create({
			data: {
				youtube_id: video.youtube_id,
				shown_rank: video.rank,
				user_id: video.user_id
			}
		});
	}
}

async function getUser(id) {
	if (users[id]) return users[id];

	await new Promise((resolve) => setTimeout(resolve, 1000));
	let userReq = await fetch(`${userReqLink}${id}`);
	let userData = await userReq.json();

	users[id] = userData[0];
	return userData[0];
}
