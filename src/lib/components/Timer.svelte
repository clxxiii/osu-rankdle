<script>
	import { day0, getDay } from '$lib/constants';
	import { onMount } from 'svelte';

	export let title = 'Time until HP reset';
	export let toTime = null;

	let hours = '';
	let minutes = '';
	let seconds = '';

	let shift = getDay() * 1000 * 60 * 60 * 24;
	toTime = toTime ?? day0.getTime() + shift;

	onMount(() => {
		let updateTimer = () => {
			let diff = toTime - Date.now();

			hours = Math.floor(diff / 1000 / 60 / 60);
			minutes = Math.floor(diff / 1000 / 60) % 60;
			seconds = Math.floor(diff / 1000) % 60;

			if (diff <= 0) {
				clearInterval(x);
			}
		};

		let x = setInterval(updateTimer, 1000);
		updateTimer();
	});
</script>

<div class="timer">
	<div class="title">{title}</div>
	<div class="numbers">
		<div class="h">{hours}</div>
		<div class="m">{minutes}</div>
		<div class="s">{seconds}</div>
	</div>
</div>

<style>
	.timer {
		font-size: 24px;
		display: flex;
		align-items: center;
		flex-direction: column;
		margin: 5px;
	}
	.title {
		font-weight: 600;
	}
	.numbers {
		display: flex;
		gap: 5px;
		font-family: SofiaSans;
	}
</style>
