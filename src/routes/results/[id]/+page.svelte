<script lang="ts">
	export let data: any;
</script>

<div class="results">
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
			<li>
				<a href="/results/{data.stats_id}/{day.day}">
					<div class="day">{day.day}</div>
					<div class="score">Score: {day.guesses.length}</div>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	h1 {
		color: var(--yellow);
	}
	.results {
		margin: 20px;
		width: 70%;
		max-width: 1000px;
	}
	li {
		width: 100%;
		margin-bottom: 0.5em;
		list-style: none;
	}
	a {
		transform: skew(-15deg);
		display: flex;
		padding: 5px;
		transition: width 0.15s ease;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		text-decoration: none;
		color: white;
		background-color: #222222;
		height: 50px;
	}
	a .day {
		margin-left: 15px;
		font-size: 35px;
		transform: skew(15deg);
	}
	a .score {
		margin-right: 15px;
		font-weight: bold;
		transform: skew(15deg);
	}

	a:hover {
		width: calc(100% - 18px);
	}
</style>
