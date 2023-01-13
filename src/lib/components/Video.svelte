<script>
	export let video_id;

	export const changeId = (id) => (video_id = id);
</script>

<iframe
	width="560"
	height="315"
	src="https://www.youtube.com/embed/{video_id}"
	title="YouTube video player"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowfullscreen
/>
