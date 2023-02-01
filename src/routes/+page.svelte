<script lang="ts">
	import HpBar from '$lib/components/HPBar.svelte';
	import Input from '$lib/components/Input.svelte';
	import LockIn from '$lib/components/LockIn.svelte';
	import LoginScreen from '$lib/components/LoginScreen.svelte';
	import Next from '$lib/components/Next.svelte';
	import PlayedBy from '$lib/components/PlayedBy.svelte';
	import Report from '$lib/components/ReportButton.svelte';
	import Results from '$lib/components/Results.svelte';
	import Video from '$lib/components/Video.svelte';
	import type { User } from '@prisma/client';
	import { onMount } from 'svelte';
	import '../app.css';

	export let data: any;

	let inputBar: Input;
	let hpBar: HpBar;
	let next: Next;
	let lockin: LockIn;
	let video: Video;
	let playedBy: PlayedBy;
  let report: Report;

	let resultData = {
		streak: data.session?.stats?.streak,
		highest_score: data.session?.stats?.highest_score,
		longest_streak: data.session?.stats?.longest_streak,
		score: data.score
	};

	let resultsShown = false;
	let currentScore = data.score ?? 0;

	const clickFunction = () => {
		return inputBar.getValue();
	};

	const setVideo = (v: string) => {
		video.changeId(v);
	};

	const setHP = (n: number) => {
		hpBar.set(n);
	};

	type FinalResults = {
		streak: number;
		highest_score: number;
		score: number;
		longest_streak: number;
	};

	const showResults = (d: FinalResults) => {
		resultData = {
			streak: d.streak,
			highest_score: d.highest_score,
			longest_streak: d.longest_streak,
			score: d.score
		};
		resultsShown = true;
	};

	type Result = {
		answer: number;
		guess: number;
		penalty: number;
		user: User;
	};

	const sleep = async (timeMS: number) =>
		await new Promise((resolve) => setTimeout(resolve, timeMS));

	export const endRound = async (result: Result) => {
		currentScore += 1;
		inputBar.disableInput();
		inputBar.collapse();
		await sleep(750);
		inputBar.showAnswerLine(result.answer);
		await sleep(750);
		inputBar.showPenaltyBox(result.answer, result.penalty);
		hpBar.hit(result.penalty);
		await sleep(500);
		playedBy.changeUser(result.user);
		playedBy.show();
		report.show();
		if (hpBar.getHP() > 0) {
			next.show();
		} else {
			let statReq = await fetch('/api/finalize_results');
			let results = await statReq.json();
			next.hide();
			showResults(results);
		}
	};

	onMount(() => {
		if (data?.session?.stats?.hp <= 0) {
			lockin.hide();
			next.hide();
		}
	});
</script>

<svelte:head>
	<title>osu! Rankdle</title>
</svelte:head>

<div class="page">
	<h1>
		osu! rankdle <div class="beta">beta</div>
	</h1>
	<div class="score">Current Score: {currentScore}</div>
	<Video bind:this={video} video_id={data?.video?.youtube_id} />
	<Report bind:this={report} />
	<Input bind:this={inputBar} />
	<LockIn endRoundFunction={endRound} bind:this={lockin} getValueFunction={clickFunction} />
	<Next {report} {playedBy} {video} inputbar={inputBar} {lockin} bind:this={next} />
	<HpBar hp={data?.session?.stats?.hp} bind:this={hpBar} />
	{#if !data.session}
		<LoginScreen {setVideo} {setHP} />
	{/if}
	{#if data?.session?.stats?.played_today || resultsShown}
		<Results {...resultData} stats_id={data.session.stats_id} />
	{/if}
	<PlayedBy bind:this={playedBy} />
</div>

<style>
	h1 {
		color: var(--yellow);
		margin: 0;
		display: flex;
		gap: 5px;
		align-items: center;
		justify-content: center;
	}
	.score {
		margin-bottom: 0.75em;
	}
	.page {
		display: flex;
		margin: 20px;
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
