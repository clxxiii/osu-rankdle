<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	onMount(moveBox);

	let sliderMin = 1;
	let sliderMax = 2000000;

	let output: any;
	let input: any;

	// These are a magic function that
	// takes the input slider position
	// and makes it more natural
	let exponential = (x: number) => {
		if (x == sliderMax) return sliderMax;
		return Math.round(Math.pow(1.2053, Math.pow(x, 0.3)));
	};

	let inverse = (x: number) => {
		if (x == sliderMax) return sliderMax;
		let sub = Math.log(x) / Math.log(1.2053);
		return Math.pow(sub, 3) * Math.pow(sub, 1 / 3);
	};

	function sliderInput() {
		currentTextInput = '';
		output.textContent = '#' + exponential(this.value).toLocaleString();
		moveBox();
	}

	function moveBox() {
		// width = slider length - thumb size
		output.style.opacity = 1;
		let width = input.offsetWidth - 200;
		let movePercent = input.value / sliderMax;
		output.style.transform = `translate(${movePercent * width}px)`;
	}

	let currentTextInput = '';
	if (browser) {
		document.addEventListener('mousedown', () => (output.style.transition = '0s ease'));
		document.addEventListener('mouseup', () => (output.style.transition = '0.15s ease'));
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
				output.textContent = '#' + parseInt(currentTextInput).toLocaleString();
			} else {
				output.textContent = 'Type to guess';
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
	<div class="textbox" bind:this={output}>Type to guess</div>
</div>

<style>
	input[type='range'] {
		appearance: none;
		outline: none;
		background: transparent;
		max-width: 1000px;
		width: 95vw;
		height: 50px;
	}
	input[type='range']::-webkit-slider-runnable-track {
		background: rgb(92, 92, 92);
		height: 10px;
		border-radius: 1000px;
	}

	input[type='range']::-webkit-slider-thumb {
		/* color: white; */
		appearance: none;
		/* margin-top: -20px; 
		background-color: #3d3d3d;
		border-radius: 5px;
		border: solid 3px rgb(119, 119, 119); */
		height: 50px;
		width: 200px;
	}
	.slider {
		position: relative;
		z-index: 0;
	}
	.slider input {
		z-index: 1;
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
