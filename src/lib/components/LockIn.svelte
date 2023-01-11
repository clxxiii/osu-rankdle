<script>
	export let getValueFunction;
	export let hpbar;
	import { sliderMin, sliderMax, exponential, inverse } from '$lib/exponentials';

	async function lockIn() {
		let inputValue = getValueFunction();
		const answerRes = await fetch(`/api/get_answer?input=${inputValue}`);
		const answer = await answerRes.json();
		hpbar.hit(answer.penalty);
		console.log(answer);
	}
</script>

<button on:click={lockIn}>Lock In</button>

<style></style>
