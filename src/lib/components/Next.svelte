<script lang="ts">
	import type Input from './Input.svelte';
	import type LockIn from './LockIn.svelte';
	import type PlayedBy from './PlayedBy.svelte';
	import type Report from './Report.svelte';
	import type Video from './Video.svelte';

	let next: any;
	export let inputbar: Input;
	export let lockin: LockIn;
	export let video: Video;
	export let playedBy: PlayedBy;
	export let report: Report;

	export const show = () => {
		next.style.display = 'block';
		next.style.opacity = 1;
	};

	export const hide = () => {
		next.style.opacity = 0;
		setTimeout(() => (next.style.display = 'none'), 500);
	};

	let clicked = async () => {
		inputbar.reset();
		lockin.show();
		playedBy.hide();
		report.hide();
		hide();

		let newVideoReq = await fetch('/api/get_video');
		let newVideo = await newVideoReq.json();
		video.changeId(newVideo.youtube_id);
	};
</script>

<button style="display: none" on:click={clicked} bind:this={next}>Next</button>

<style>
	button {
		position: relative;
		transition: 0.5s ease;
		opacity: 0;
		display: flex;
		width: 220px;
		height: 50px;
		background: #333333;
		color: rgb(194, 194, 194);
		font-size: 45px;
		display: flex;
		align-items: center;
		cursor: pointer;
		justify-content: space-evenly;
		border: 0;
		transition: width 0.1s ease;
		font-family: SofiaSans;
		text-transform: uppercase;
		font-weight: 800;
		gap: 10px;
	}
	button:hover {
		width: 190px;
	}
</style>
