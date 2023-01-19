<script lang="ts">
	export let data: any;
</script>

{#if data.stats_id == data.session.stats_id}
	<h1>Your Play History</h1>
{:else if data.user != null}
	<h1>{data.user.username}'s stats</h1>
{:else}
	<h1>We're not sure who this person is,<br /> but we have their history.</h1>
{/if}

{#if data.history.length == 0}
	This user has not completed a game yet!
{/if}
<ul>
	{#each data.history as day}
		<li><a href="/results/{data.stats_id}/{day.day}">Day {day.day}</a></li>
	{/each}
</ul>
