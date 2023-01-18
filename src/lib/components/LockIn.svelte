<script>
	export let getValueFunction;
	export let hpbar;
	let el;

	async function lockIn() {
		let inputValue = getValueFunction();
		const answerRes = await fetch(`/api/get_answer?input=${inputValue}`);
		const answer = await answerRes.json();
		hpbar.animate(answer);
		hide();
	}

	export const hide = () => {
		el.style.opacity = 0;
		setTimeout(() => (el.style.display = 'none'), 500);
	};
	export const show = () => {
		el.style.display = 'block';
		el.style.opacity = 1;
	};
</script>

<button bind:this={el} on:click={lockIn}>Lock In</button>

<style>
	button {
		transition: opacity 0.5s ease;
	}
</style>
