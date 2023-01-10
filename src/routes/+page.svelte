<script>
	import Input from '$lib/components/Input.svelte';
	import Video from '$lib/components/Video.svelte';
	import '../app.css';
</script>

<svelte:head>
	<title>osu! Rankdle</title>
</svelte:head>

<div class="page">
	<h1>osu! rankdle</h1>
	<Video video_id="-PXeI0gRaaw" />
	<Input />
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
</style>
