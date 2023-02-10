<script lang="ts">
	import LeaderboardRow from '$lib/components/LeaderboardRow.svelte';
	import PageSwitcher from '$lib/components/PageSwitcher.svelte';
	import type { User } from '@prisma/client';

	type Leaderboard = {
		user: User;
		history: { day: number; _count: { guesses: number } }[];
		_count: {
			sessions: number;
			history: number;
			guesses: number;
			reports: number;
		};
	}[];

	type Data = {
		lb: Leaderboard;
		page: number;
		max: number;
	};

	export let data: Data;
</script>

<div class="leaderboard">
	<h1>Leaderboard</h1>
	<h3>Page {data.page}</h3>

	<div class="header">
		<b>#</b>
		<b style="width: 150px; margin-left: 20px">Player</b>
		<b>Guesses</b>
		<b>Days</b>
		<b>First day</b>
	</div>
	{#each data.lb as user, i}
		<LeaderboardRow {user} daily index={i + 1 + 100 * (data.page - 1)} />
	{/each}
	<PageSwitcher max={data.max} i={data.page} url={'/leaderboard'} />
</div>

<style>
	.leaderboard {
		width: 70%;
		max-width: 1000px;
		margin: 20px;
	}
	h1 {
		color: var(--yellow);
	}
	.header {
		display: grid;
		place-items: center;
		font-family: 'SofiaSans';
		grid-template-columns: 50px 150px 25% 25% 25%;
	}
</style>
