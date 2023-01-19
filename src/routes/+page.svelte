<script>
	import HpBar from '$lib/components/HPBar.svelte';
	import Input from '$lib/components/Input.svelte';
	import LockIn from '$lib/components/LockIn.svelte';
	import LoginScreen from '$lib/components/LoginScreen.svelte';
	import Next from '$lib/components/Next.svelte';
	import Results from '$lib/components/Results.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import Video from '$lib/components/Video.svelte';
	import '../app.css';
	export let data;

	let inputbar;
	let hpbar;
	let next;
	let lockin;
	let video;
	let results;
	let resultData = {
		streak: data.session?.stats?.streak,
		highest_score: data.session?.stats?.highest_score,
		longest_streak: data.session?.stats?.longest_streak,
		score: data.score
	};

	let resultsShown = false;

	const clickFunction = () => {
		return inputbar.getValue();
	};

	const setVideo = (v) => {
		video.changeId(v);
	};

	const setHP = (n) => {
		hpbar.set(n);
	};

	const showResults = (d) => {
		resultData = {
			streak: d.streak,
			highest_score: d.highest_score,
			longest_streak: d.longest_streak,
			score: d.score
		};
		resultsShown = true;
	};
</script>

<svelte:head>
	<title>osu! Rankdle</title>
</svelte:head>

<div class="page">
	<h1>osu! rankdle</h1>
	<Video bind:this={video} video_id={data?.video?.youtube_id} />
	<Input bind:this={inputbar} />
	<LockIn {hpbar} bind:this={lockin} getValueFunction={clickFunction} />
	<Next {video} {inputbar} {lockin} bind:this={next} />
	<HpBar {next} {inputbar} {showResults} hp={data?.session?.stats?.hp} bind:this={hpbar} />
	<Menu userData={data?.session?.stats?.user} />
	{#if !data.session}
		<LoginScreen {setVideo} {setHP} />
	{/if}
	{#if data?.session?.stats?.played_today || resultsShown}
		<Results {...resultData} bind:this={results} />
	{/if}
</div>

<style>
	h1 {
		color: var(--yellow);
	}
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
