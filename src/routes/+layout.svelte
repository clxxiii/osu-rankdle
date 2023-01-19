<script>
  import "../app.css"
	import Menu from '$lib/components/Menu.svelte';
  export let data;
</script>

	<Menu userData={data?.session?.stats?.user} />
<slot />
