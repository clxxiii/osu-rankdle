<script lang="ts">
	export let video_id: string;

	export const changeId = (id: string) => (video_id = id);
</script>

<iframe
	width="560"
	src="https://www.youtube.com/embed/{video_id}"
	title="YouTube video player"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowfullscreen
/>

<style>
	iframe {
		max-width: 90vw;
		aspect-ratio: calc(16 / 9);
	}
</style>
