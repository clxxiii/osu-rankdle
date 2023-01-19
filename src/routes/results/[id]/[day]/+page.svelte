<script lang="ts">
	import Guess from '$lib/components/Guess.svelte';

	export let data: any;

	let username = data?.user?.username ?? data?.session?.stats?.user?.username ?? 'Someone';
</script>

<h1>{username}'s Day {data.day.day}</h1>

{#each data.day.guesses as guess}
	<Guess {...guess} />
{/each}
