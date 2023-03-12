<script lang="ts">
	import type { User as UserType, UserDay } from '@prisma/client';
	import Profile from '$lib/components/Profile.svelte';
	import MiniInput from '$lib/components/MiniInput.svelte';

	type Data = {
		user: UserType;
		score: {
			best: number;
			total: number;
		};
		days: UserDay[] & { _count: { guesses: number } }[];
		guesses: {
			id: string;
			penalty: number;
			input: number;
			video: {
				shown_rank: number;
				youtube_id: string;
			};
		}[];
	};
	export let data: Data;

	let pageWidth: number;
</script>

<div class="page" bind:clientWidth={pageWidth}>
	<div class="wrap">
		{#if pageWidth >= 800}
			<Profile user={data.user} scale={200} />
		{:else}
			<Profile user={data.user} scale={100} />
		{/if}
	</div>
	<hr />

	<div class="stats">
		<div class="stat">
			<div class="label">Played Since</div>
			<div class="number">{data.days[0].day}</div>
		</div>
		<div class="stat">
			<div class="label">Total Score</div>
			<div class="number">{data.score.total}</div>
		</div>
		<div class="stat">
			<div class="label">Best Score</div>
			<div class="number">{data.score.best}</div>
		</div>
		<div class="stat">
			<div class="label">Days Played</div>
			<div class="number">{data.days.length}</div>
		</div>
	</div>
	<div class="columns">
		<div class="history">
			<h2>History</h2>
			<hr />
			<div class="days">
				{#each data.days as day}
					<a class="day" href="/results/{data.user.stats_id}/{day.day}">
						<div class="number">{day.day}</div>
						<div class="score">Score: {day._count.guesses}</div>
					</a>
				{/each}
			</div>
		</div>
		<div class="best-guess">
			<h2>Best Guesses</h2>
			<hr />
			{#each data.guesses as guess}
				<a class="guess" href="/guess/{guess.id}">
					<img
						src="https://i3.ytimg.com/vi/{guess.video.youtube_id}/maxresdefault.jpg"
						alt="thumbnail"
						class="thumbnail"
					/>
					<MiniInput input={guess.input} answer={guess.video.shown_rank} />
					<div class="input">#{guess.input.toLocaleString()}</div>
					<div class="answer">#{guess.video.shown_rank.toLocaleString()}</div>
				</a>
			{/each}
		</div>
	</div>
</div>

<style>
	.wrap {
		margin: auto;
		overflow: hidden;
	}
	.page {
		margin: auto;
		margin-top: 50px;
		width: calc(100vw - 10%);
		max-width: 1000px;
	}
	.guess {
		height: 50px;
		padding: 5px;
		margin: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 95%;
		background-color: #222222;
	}
	.thumbnail {
		aspect-ratio: calc(16 / 9);
		height: 50px;
	}
	.guess .input,
	.guess .answer {
		font-family: 'SofiaSans';
		width: 50px;
		text-align: center;
	}
	hr {
		border: solid 2px var(--yellow);
	}
	.stats {
		display: grid;
		grid-template-columns: 25% 25% 25% 25%;
		height: 100px;
	}
	.columns {
		display: grid;
		grid-template-columns: 45% 45%;
		margin-top: 50px;
		justify-content: space-between;
	}
	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.stat .label {
		text-transform: uppercase;
		font-family: 'SofiaSans';
		font-weight: 200;
	}
	.stat .number {
		font-size: 100px;
		font-weight: 900;
		line-height: 0.75;
	}
	a {
		text-decoration: none;
		color: white;
	}
	a.day {
		transform: skew(-15deg);
		display: flex;
		margin-bottom: 10px;
		padding: 5px;
		transition: width 0.15s ease;
		width: 95%;
		align-items: center;
		justify-content: space-between;
		background-color: #222222;
		height: 50px;
	}
	a .number {
		margin-left: 15px;
		font-size: 35px;
		transform: skew(15deg);
	}
	a .score {
		margin-right: 15px;
		font-weight: bold;
		transform: skew(15deg);
	}

	a.day:hover {
		width: calc(95% - 18px);
	}
	@media screen and (max-width: 1000px) {
		.page {
			margin: 50px 5% 0 5%;
		}
		.columns {
			display: flex;
			flex-direction: column-reverse;
		}
	}
	@media screen and (max-width: 800px) {
		.stat .number {
			font-size: 64px;
		}
	}
</style>
