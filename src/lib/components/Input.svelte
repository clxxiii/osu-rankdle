<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { sliderMin, sliderMax, exponential, inverse } from '$lib/exponentials';

	onMount(moveBox);

	let textbox: any;
	let input: any;

	export const getValue = () => exponential(input.value);

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
</div>

<style>
	.slider {
		position: relative;
		z-index: 0;
		margin: 9px;
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
	.slider .textbox {
		position: absolute;
		top: 0;
		transition: 0.15s ease;
		opacity: 0;
		height: 38px;
		width: 186px;
		display: grid;
		place-items: center;
		pointer-events: none;
		background-color: #3d3d3d;
		border-radius: 5px;
		border: solid 3px rgb(119, 119, 119);
		height: 50px;
		width: 200px;
		z-index: 2;
	}
</style>
