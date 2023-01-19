<script lang="ts">
	export let data: any;
</script>

<h1>Your Play History</h1>
<ul>
	{#each data.history as day}
		<li><a href="/results/{data.session.stats_id}/{day.day}">Day {day.day}</a></li>
	{/each}
</ul>
