<script>
	import HpBar from '$lib/components/HPBar.svelte';
	import Input from '$lib/components/Input.svelte';
	import LockIn from '$lib/components/LockIn.svelte';
	import Next from '$lib/components/Next.svelte';
	import Submit from '$lib/components/Submit.svelte';
	import Video from '$lib/components/Video.svelte';
  import InfoBox from '$lib/components/InfoBox.svelte';
	import '../app.css';
	export let data;

	let inputbar;
	let hpbar;
	let next;
	let lockin;
	let video;

	const clickFunction = () => {
		return inputbar.getValue();
	};
</script>

<svelte:head>
	<title>osu! Rankdle</title>
</svelte:head>

<div class="page">
	<h1>osu! rankdle</h1>
	<Video bind:this={video} video_id={data.video} />
	<Input bind:this={inputbar} />
	<LockIn {hpbar} bind:this={lockin} getValueFunction={clickFunction} />
	<Next {video} {inputbar} {lockin} bind:this={next} />
	<HpBar {next} {inputbar} hp={data.session.stats.hp} bind:this={hpbar} />
  <div class="submit"><Submit /></div>
  <InfoBox />
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
  .submit {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
