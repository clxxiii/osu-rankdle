<script lang="ts">
	import Changelog from '$lib/components/Changelog.svelte';

	export let data;
</script>

<div class="changelog">
	<h1>Changelog</h1>
	<div class="articles">
		{#each data.articles as article}
			<Changelog {article} />
		{/each}
	</div>
</div>

<style>
	.changelog {
		margin: 20px;
		width: 70%;
		max-width: 1000px;
	}
	h1 {
		color: var(--yellow);
	}
</style>
