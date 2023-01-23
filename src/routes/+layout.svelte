<script>
	import '../app.css';
	import Menu from '$lib/components/Menu.svelte';
	import BottomLinks from '$lib/components/BottomLinks.svelte';
	export let data;
</script>

<header>
	<Menu userData={data?.session?.stats?.user} />
</header>
<main>
	<slot />
</main>
<footer>
	<BottomLinks />
</footer>

<style>
	main {
		min-height: calc(100vh - 61px);
	}
	footer {
		position: relative;
		height: 40px;
	}
</style>
