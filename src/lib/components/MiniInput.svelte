<script lang="ts">
	export let input: number;
	export let answer: number;

	import { inverse, sliderMax } from '$lib/constants';
	import { onMount } from 'svelte';

	let graph: HTMLDivElement;
	let box: HTMLDivElement;

	onMount(() => {
		let inputWidth = graph.offsetWidth;
		let answerPosition = (inverse(answer) / sliderMax) * inputWidth;
		let guessPosition = (inverse(input) / sliderMax) * inputWidth;

		if (answerPosition > guessPosition) {
			box.classList.remove('overguess');
			box.style.left = `${answerPosition}px`;
			box.style.width = `${answerPosition - guessPosition}px`;
		} else {
			box.classList.remove('underguess');
			box.style.left = `${answerPosition}px`;
			box.style.width = `${guessPosition - answerPosition}px`;
		}
	});
</script>

<div class="graph" bind:this={graph}>
	<div class="line" />
	<div class="answer overguess underguess" bind:this={box} />
</div>

<style>
	.graph {
		position: relative;
		width: 150px;
		height: 30px;
	}
	.line {
		width: 100%;
		height: calc(50% - 2px);
		border-bottom: solid 4px #3d3d3d;
	}
	.answer {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 50%;
		--red: rgb(116, 44, 44);
		background-color: var(--red);
	}
	.answer.overguess {
		border-left: dashed 2px #aaaaaa;
		border-right: solid 2px white;
	}
	.answer.underguess {
		border-left: solid 2px white;
		border-right: dashed 2px #aaaaaa;
	}
	.answer:not(.underguess):not(.overguess) {
		background-color: var(--green);
		width: 3px;
	}
</style>
