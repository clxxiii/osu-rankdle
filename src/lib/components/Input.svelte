<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { sliderMin, sliderMax, exponential, inverse } from '$lib/constants';

	onMount(moveBox);

	let textbox: any;
	let guessbox: any;
	let input: any;
	let answerline: any;
	let answerlinetext: any;
	let penaltybox: any;

	let inputDisabled: boolean;

	export const getValue = () => exponential(input.value);
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
		let movePercent = inverse(exponential(input.value)) / sliderMax;
		let currentTransform = movePercent * inputWidth;
		textbox.textContent = '';
		textbox.style.transform = `translate(${currentTransform}px)`;
		textbox.style.transition = '0.5s ease';
		textbox.style.width = '0px';
		guessbox.style.opacity = '1';
		guessbox.style.transform = `translate(${currentTransform - 100}px)`;
		guessbox.textContent = '#' + exponential(input.value).toLocaleString();
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
		let guessPosition = (inverse(exponential(input.value)) / sliderMax) * inputWidth;

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
		input.value = sliderMax / 2; // Center
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
		textbox.style.opacity = 1;
		let width = input.offsetWidth - 200;
		let movePercent = input.value / sliderMax;
		textbox.style.transform = `translate(${movePercent * width}px)`;
	}

	let currentTextInput = '';
	if (browser) {
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
			input.value = inverse(parseInt(currentTextInput));
			moveBox();
		});
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
	<div class="textbox" bind:this={textbox}>Type to guess</div>
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
		margin: 30px;
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
		box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.25);
		max-width: 1006px;
		width: 95vw;
		height: 56px;
		z-index: 0;
	}
	.slider .textbox,
	.guessbox {
		position: absolute;
		bottom: 0px;
		transition: 0.15s ease;
		opacity: 0;
		display: grid;
		background-color: #3d3d3d;
		border-radius: 5px;
		border: solid 3px rgb(119, 119, 119);
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
		background-color: none;
		border: 0;
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
