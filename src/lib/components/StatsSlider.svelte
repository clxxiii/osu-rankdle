<script lang="ts">
	import { inverse, sliderMax } from '$lib/constants';

	type Guess = {
		input: number;
		penalty: number;
		stats: {
			user: {
				id: number;
				username: string;
				rank: number;
			};
		};
	};
	export let guesses: Guess[];
	export let answer: number;

	let graph: HTMLDivElement;
</script>

<div class="graph" bind:this={graph}>
	<div class="line" />
	<div class="answer" style="left: {(inverse(answer) / sliderMax) * 100}%" />
	{#each guesses as guess}
		<div class="guess" style="left: {(inverse(guess.input) / sliderMax) * 100}%" />
	{/each}
</div>

<style>
	.graph {
		position: relative;
		width: 560px;
		max-width: 90vw;
		height: 30px;
	}
	.line {
		width: 100%;
		height: calc(50% - 2px);
		border-bottom: solid 4px #3d3d3d;
	}
	.guess {
		position: absolute;
		top: 0;
		width: 0px;
		height: 100%;
		border-right: solid 1px rgba(255, 0, 0, 0.4);
		transform: translateX(1px);
	}
	.answer {
		position: absolute;
		top: 0;
		width: 0px;
		height: 100%;
		border-right: solid 3px var(--green);
	}
</style>
