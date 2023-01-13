<script>
	import HpBar from '$lib/components/HPBar.svelte';
	import Input from '$lib/components/Input.svelte';
	import LockIn from '$lib/components/LockIn.svelte';
	import Video from '$lib/components/Video.svelte';
	import '../app.css';
	export let data;

	let inputbar;
	let hpbar;
	const clickFunction = () => {
		return inputbar.getValue();
	};
</script>

<svelte:head>
	<title>osu! Rankdle</title>
</svelte:head>

<div class="page">
	<h1>osu! rankdle</h1>
	<Video video_id={data.video} />
	<Input bind:this={inputbar} />
	<LockIn {hpbar} getValueFunction={clickFunction} />
	<HpBar {inputbar} hp={data.session.stats.hp} bind:this={hpbar} />
</div>

<style>
	h1 {
		color: var(--pink);
	}
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
