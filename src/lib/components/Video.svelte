<script lang="ts">
	export let video_id: string;

	export const changeId = (id: string) => (video_id = id);
</script>

{#if video_id != 'null'}
	<iframe
		width="560"
		src="https://www.youtube.com/embed/{video_id}"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		allowfullscreen
	/>
{:else}
	<div class="all">
		You have watched all the videos in the database!
		<br />
		Congrats, you beat osu! rankdle.
	</div>
{/if}

<style>
	iframe,
	.all {
		width: 560px;
		max-width: 90vw;
		aspect-ratio: calc(16 / 9);
	}
	.all {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		width: 560px;
	}
</style>
