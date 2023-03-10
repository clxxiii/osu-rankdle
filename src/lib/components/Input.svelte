<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { sliderMin, sliderMax, exponential, inverse } from '$lib/constants';

	onMount(moveBox);

	let textbox: HTMLDivElement;
	let guessbox: HTMLDivElement;
	let input: HTMLInputElement;
	let answerline: HTMLDivElement;
	let answerlinetext: HTMLDivElement;
	let penaltybox: HTMLDivElement;

	let inputDisabled: boolean;
	export let hideInputHead: boolean = false;

	export const getValue = () => exponential(parseInt(input.value));
	export const setValue = (num: number) => {
		input.value = `${inverse(num)}`;
	};
	export const disableInput = () => {
		inputDisabled = true;
		input.style.pointerEvents = 'none';
	};
	export const enableInput = () => {
		inputDisabled = false;
		input.style.pointerEvents = 'all';
	};

	// Line up guess line so answer line will fall right on top of it
	// if exact
	export function collapse() {
		let inputWidth = input.offsetWidth;
		// I know it looks stupid, this is the easiest way to account
		// for calculating the width of the slider head.
		let movePercent = inverse(exponential(parseInt(input.value))) / sliderMax;
		let currentTransform = movePercent * inputWidth;
		if (!hideInputHead) {
			textbox.textContent = '';
			textbox.style.transform = `translate(${currentTransform}px)`;
			textbox.style.transition = '0.5s ease';
			textbox.style.width = '0px';
		}
		guessbox.style.opacity = '1';
		guessbox.style.transform = `translate(${currentTransform - 100}px)`;
		guessbox.textContent = '#' + exponential(parseInt(input.value)).toLocaleString();
	}

	export function showAnswerLine(answer: number) {
		let width = input.offsetWidth;
		let movePercent = inverse(answer) / sliderMax;
		answerline.style.opacity = '1';
		answerline.style.transform = `translate(${movePercent * width + 2}px, 3px)`;
		answerlinetext.textContent = '#' + answer.toLocaleString();
	}

	export function showPenaltyBox(answer: number, penalty: number) {
		let inputWidth = input.offsetWidth;
		let answerPosition = (inverse(answer) / sliderMax) * inputWidth + 2;
		let guessPosition = (inverse(exponential(parseInt(input.value))) / sliderMax) * inputWidth;

		let boxWidth = Math.abs(answerPosition - guessPosition);
		if (answerPosition > guessPosition) {
			penaltybox.style.left = `${guessPosition + 3}px`;
		} else {
			boxWidth += 3;
			penaltybox.style.left = `${answerPosition}px`;
		}
		penaltybox.style.width = `${boxWidth}px`;
		penaltybox.style.height = '56px';
		penaltybox.textContent = `-${penalty}`;
	}

	export function reset() {
		penaltybox.style.height = '0px';
		penaltybox.style.width = '0px';
		penaltybox.textContent = '';
		answerline.style.opacity = '0';
		answerline.style.transform = '';
		answerlinetext.textContent = '';
		textbox.style.width = '200px';
		guessbox.textContent = '';
		currentTextInput = '';
		input.value = `${sliderMax / 2}`; // Center
		moveBox();
		textbox.textContent = 'Type to guess';
		enableInput();
	}

	function sliderInput() {
		currentTextInput = '';
		textbox.textContent = '#' + exponential(this.value).toLocaleString();
		moveBox();
	}

	function moveBox() {
		// width = slider length - thumb size
		let width = input.offsetWidth - 200;
		const movePercent = parseInt(input.value) / sliderMax;
		const color1 = [162, 199, 229];
		const color2 = [162, 229, 184];
		const [r, g, b] = interpolateColor(color1, color2, movePercent);
		if (!hideInputHead) {
			textbox.style.opacity = '1';
			textbox.style.color = `rgb(${r}, ${g}, ${b})`;
			textbox.style.transform = `translate(${movePercent * width}px)`;
		}
	}

	let currentTextInput = '';
	if (browser) {
		document.addEventListener('resize', moveBox);
		document.addEventListener('mousedown', () => (textbox.style.transition = '0s ease'));
		document.addEventListener('mouseup', () => (textbox.style.transition = '0.15s ease'));
		document.addEventListener('keydown', (ev) => {
			if (inputDisabled) return;
			let old = currentTextInput;
			if (ev.key == 'Backspace') {
				currentTextInput = currentTextInput.substring(0, currentTextInput.length - 1);
			}

			if (ev.key == 'Escape') {
				currentTextInput = '';
			}

			if (ev.key == 'k') {
				currentTextInput += '000';
			}

			let keyList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
			if (keyList.includes(ev.key)) {
				currentTextInput += ev.key;
			}

			if (old == currentTextInput) return;
			if (parseInt(currentTextInput) > sliderMax) currentTextInput = `${sliderMax}`;
			if (parseInt(currentTextInput) < sliderMin) currentTextInput = `${sliderMin}`;
			if (currentTextInput == 'NaN') currentTextInput = '';

			if (currentTextInput != '') {
				textbox.textContent = '#' + parseInt(currentTextInput).toLocaleString();
			} else {
				textbox.textContent = 'Type to guess';
			}
			input.value = `${inverse(parseInt(currentTextInput))}`;
			moveBox();
		});
	}
	// https://graphicdesign.stackexchange.com/questions/83866/generating-a-series-of-colors-between-two-colors/83869
	function interpolateColor(color1: number[], color2: number[], factor: number) {
		if (arguments.length < 3) {
			factor = 0.5;
		}
		var result = color1.slice();
		for (var i = 0; i < 3; i++) {
			result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
		}
		return result;
	}
</script>

<div class="slider">
	<input
		on:input={sliderInput}
		bind:this={input}
		type="range"
		value="1000000"
		min={sliderMin}
		max={sliderMax}
	/>
	<div class="body" />
	{#if !hideInputHead}
		<div class="textbox" bind:this={textbox}>Type to guess</div>
	{/if}
	<div class="guessbox" bind:this={guessbox}>Type to guess</div>
	<div class="answerline" bind:this={answerline}>
		<div bind:this={answerlinetext} class="text" />
	</div>
	<div bind:this={penaltybox} class="penaltybox" />
</div>

<style>
	.slider {
		position: relative;
		z-index: 0;
		margin: 15px;
    margin-top: 30px;
		transform: skew(-15deg);
	}
	input[type='range'] {
		appearance: none;
		outline: none;
		background: transparent;
		max-width: 1000px;
		width: 95vw;
		height: 50px;
		z-index: 1;
	}
	input[type='range']::-webkit-slider-runnable-track {
		height: 10px;
	}

	input[type='range']::-webkit-slider-thumb {
		/* color: white; */
		appearance: none;
		height: 50px;
		width: 200px;
	}
	.slider .body {
		position: absolute;
		top: 0;
		background-color: rgb(22, 22, 22);
		pointer-events: none;
		border-radius: 5px;
		overflow: hidden;
		box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.25);
		max-width: 1006px;
		width: 95vw;
		height: 53px;
		z-index: 0;
	}
	.textbox {
		font-family: SofiaSans;
		font-size: 24px;
		color: var(--lavender);
	}
	.slider .textbox,
	.guessbox {
		position: absolute;
		bottom: 0px;
		transition: 0.15s ease;
		opacity: 0;
		display: grid;
		background: linear-gradient(0deg, rgba(119, 119, 119, 0.5), transparent 75%);
		/* border-radius: 5px; */
		border-bottom: solid 3px rgb(119, 119, 119);
		height: 50px;
		text-align: center;
		place-items: center;
		pointer-events: none;
		width: 200px;
		z-index: 2;
	}
	.guessbox {
		bottom: -5px;
		opacity: 0;
		transition: 0.5s ease;
		background: none;
		border-bottom: 0;
		height: 0;
	}
	.answerline {
		position: absolute;
		top: 0;
		opacity: 0;
		width: 0;
		transform: translateY(3px);
		transition: 0.5s ease;
		height: 50px;
		border-left: white dashed 2px;
		z-index: 3;
	}
	.answerline .text {
		width: 200px;
		text-align: center;
		transform: translate(-105px, -28px);
	}
	.penaltybox {
		position: absolute;
		width: 0;
		bottom: 0;
		transition: height 0.5s ease;
		height: 0px;
		background-color: var(--red);
		display: grid;
		place-items: center;
		font-weight: bold;
	}
</style>
