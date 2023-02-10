<script lang="ts">
	export let i: number;
	export let url: string;
	export let max: number;
</script>

<div class="switcher">
	{#if i > 1}
		<a href="{url}?page={i - 1}">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="left w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
			</svg>
		</a>
	{:else}
		<span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="left w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
			</svg>
		</span>
	{/if}

	<!-- {#each buttons as button} -->
	<!-- 	<span> -->
	<!-- 		{button} -->
	<!-- 	</span> -->
	<!-- {/each} -->

	{#if i < max}
		<a href="{url}?page={i + 1}">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewbox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentcolor"
				class="right w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5l7.5 7.5-7.5 7.5" />
			</svg>
		</a>
	{:else}
		<span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewbox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentcolor"
				class="right w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5l7.5 7.5-7.5 7.5" />
			</svg>
		</span>
	{/if}
</div>

<!-- HTML HERE -->
<style>
	.switcher {
		margin: auto;
		width: 300px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	svg {
		height: 30px;
	}
	a {
		color: white;
		text-decoration: none;
	}
	span svg {
		stroke: #3d3d3d;
	}
</style>
