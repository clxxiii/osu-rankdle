<script lang="ts">
	import LeaderboardRow from '$lib/components/LeaderboardRow.svelte';
	import type { User } from '@prisma/client';

	type Leaderboard = {
		user: User;
		history: { day: number }[];
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
	};

	export let data: Data;
</script>

<div class="leaderboard">
	<h1>Leaderboard</h1>

	<div class="header">
		<b>#</b>
		<b>Player</b>
		<b>Total Score</b>
		<b>Total Days Played</b>
		<b>First day played</b>
	</div>
	{#each data.lb as user, i}
		<LeaderboardRow {user} index={i + 1 + 100 * (data.page - 1)} />
	{/each}
</div>

<style>
	.leaderboard {
		margin: 20px;
	}
	h1 {
		color: var(--yellow);
	}
	.header {
		display: grid;
		width: 70%;
		place-items: center;
		font-family: 'SofiaSans';
		max-width: 1000px;
		grid-template-columns: 50px 25% 25% 25% 25% 25%;
	}
</style>
