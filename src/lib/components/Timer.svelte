<script>
	import { day0, getDay } from '$lib/constants';
	import { onMount } from 'svelte';

	let hours;
	let minutes;
	let seconds;

	let shift = getDay() * 1000 * 60 * 60 * 24;
	let nextDay = day0.getTime() + shift;

	onMount(() => {
		let diff = nextDay - Date.now();
		hours = Math.floor(diff / 1000 / 60 / 60);
		minutes = Math.floor(diff / 1000 / 60) % 60;
		seconds = Math.floor(diff / 1000) % 60;

		let x = setInterval(() => {
			let diff = nextDay - Date.now();

			hours = Math.floor(diff / 1000 / 60 / 60);
			minutes = Math.floor(diff / 1000 / 60) % 60;
			seconds = Math.floor(diff / 1000) % 60;

			if (diff <= 0) {
				clearInterval(x);
			}
		}, 1000);
	});
</script>

<div class="h">{hours}</div>
<div class="m">{minutes}</div>
<div class="s">{seconds}</div>
