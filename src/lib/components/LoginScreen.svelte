<script>
	import InfoBox from './InfoBox.svelte';
	let el;
	export let setVideo;
	export let setHP;

	export const hide = () => el.hide();
	const loginNoAccount = async () => {
		let statsReq = await fetch('/api/make_stats');
		let stats = await statsReq.json();
		let videoReq = await fetch('/api/get_video');
		let video = await videoReq.json();
		setVideo(video.youtube_id);
		setHP(stats.hp);
		hide();
	};
</script>

<InfoBox bind:this={el} closeable="false">
	<button on:click={() => (window.location.href = '/api/login')}>Login with osu!</button>
	<button on:click={loginNoAccount}>Play without an account for now</button>
</InfoBox>

<style>
</style>
