<script lang="ts">
	import Guess from '$lib/components/Guess.svelte';

	export let data: any;

	let username = data?.user?.username ?? data?.session?.stats?.user?.username ?? 'Someone';
</script>

<div class="results">
	<h1><a href="./">{username}'s Day {data.day.day}</a></h1>

	{#each data.day.guesses as guess}
		<Guess {...guess} />
	{/each}
</div>

<style>
	h1 {
		color: var(--yellow);
	}
	a {
		color: inherit;
		text-decoration: none;
	}
	.results {
		margin: 20px;
		width: 70%;
		max-width: 1000px;
	}
</style>
