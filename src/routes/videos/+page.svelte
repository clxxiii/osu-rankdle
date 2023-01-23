<script lang="ts">
	import VideoInList from '$lib/components/VideoInList.svelte';

	export let data: any;
	console.log(data);
</script>

<div class="page">
	<h1>Your Videos</h1>
	<div class="list">
		{#if data.videos.length > 0}
			{#each data.videos as video}
				<VideoInList {video} />
			{/each}
		{:else}
			<div class="error">
				You have no videos yet!
				<a href="/faq#video-delay">Why?</a>
			</div>
		{/if}
	</div>
</div>

<style>
	h1 {
		color: var(--yellow);
	}
	.page {
		margin: 20px;
	}
	.list {
		display: flex;
		justify-content: center;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.error {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		min-width: 100vw;
		min-height: calc(100vh - 40px);
		font-size: 24px;
		font-weight: 700;
	}
	a {
		color: var(--yellow);
	}
</style>
