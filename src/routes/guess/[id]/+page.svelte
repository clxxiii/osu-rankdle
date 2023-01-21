<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import PlayedBy from '$lib/components/PlayedBy.svelte';
	import Video from '$lib/components/Video.svelte';
	import type { User } from '@prisma/client';
	import { onMount } from 'svelte';
	export let data: any;

	let inputBar: Input;
	let video: Video;
	let playedBy: PlayedBy;

	type Result = {
		answer: number;
		guess: number;
		penalty: number;
		user: User;
	};

	const sleep = async (timeMS: number) =>
		await new Promise((resolve) => setTimeout(resolve, timeMS));

	export const endRound = async (result: Result) => {
		inputBar.setValue(result.guess);
		inputBar.disableInput();
		inputBar.collapse();
		await sleep(750);
		inputBar.showAnswerLine(result.answer);
		await sleep(750);
		inputBar.showPenaltyBox(result.answer, result.penalty);
		await sleep(500);
		playedBy.changeUser(result.user);
		playedBy.show();
	};

	onMount(() => {
		endRound(data.result);
	});
</script>

<svelte:head>
	<title>osu! Rankdle</title>
</svelte:head>

<div class="page">
	<h1>
		osu! rankdle <div class="beta">beta</div>
	</h1>
	{#if data.user}
		<div class="score">
			Guess by: <a href="https://osu.ppy.sh/u/{data.user.id}">{data.user.username}</a>
		</div>
	{/if}
	<Video bind:this={video} video_id={data.video_id} />
	<Input bind:this={inputBar} hideInputHead />
	<!-- <HpBar hp={data?.session?.stats?.hp} bind:this={hpBar} /> -->
	<PlayedBy bind:this={playedBy} />
</div>

<style>
	h1 {
		color: var(--yellow);
		margin: 0;
		margin-top: 0.5em;
		display: flex;
		gap: 5px;
		align-items: center;
		justify-content: center;
	}
	.score {
		margin-bottom: 0.75em;
	}
	a {
		color: inherit;
	}
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-weight: 600;
		justify-content: center;
	}
	.beta {
		display: inline-block;
		font-size: 0.75em;
		color: #191919;
		background-color: var(--yellow);
		padding: 5px;
	}
</style>
