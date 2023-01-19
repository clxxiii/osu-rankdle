<script>
	import InfoBox from './InfoBox.svelte';
	import User from '$lib/icons/user-octagon.svg';
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
	<div class="wrap">
		<button class="osu" on:click={() => (window.location.href = '/api/login')}
			><img src={User} alt="" /> Login with osu!</button
		>
		<button class="nosu" on:click={loginNoAccount}>Play without an account for now</button>
	</div>
</InfoBox>

<style>
	.wrap {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.osu {
		width: 90%;
		height: 40%;
		background: none;
		border: 0;
		outline: 0;
		color: white;
		font-family: SofiaSans;
		font-weight: bold;
		font-size: 36px;
		display: flex;
		background-color: var(--pink);
		border-radius: 20px;
		margin-bottom: 20px;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}
	.osu img {
		width: 60px;
	}
	.nosu {
		background: rgba(0, 0, 0, 0.5);
		border-radius: 20px;
		color: white;
		padding: 10px;
		font-family: SofiaSans;
		font-size: 18px;
		cursor: pointer;
		border: 0;
	}
</style>
