<script lang="ts">
	let next: any;
	export let inputbar: any;
	export let lockin: any;
	export let video: any;
	export let playedBy: any;

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
		hide();

		let newVideoReq = await fetch('/api/get_video');
		let newVideo = await newVideoReq.json();
		video.changeId(newVideo.youtube_id);
	};
</script>

<button on:click={clicked} bind:this={next}>Next</button>

<style>
	button {
		position: relative;
		transition: 0.5s ease;
		opacity: 0;
		display: none;
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
