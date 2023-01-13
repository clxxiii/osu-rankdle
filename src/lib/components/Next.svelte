<script lang="ts">
	let next: any;
	export let inputbar: any;
	export let lockin: any;
	export let video: any;

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
		hide();

		let newVideoReq = await fetch('/api/get_video?new=true');
		let newVideo = await newVideoReq.json();
		video.changeId(newVideo.youtube_id);
	};
</script>

<button on:click={clicked} bind:this={next}>Next</button>

<style>
	button {
		transition: 0.5s ease;
		opacity: 0;
		display: none;
	}
</style>
