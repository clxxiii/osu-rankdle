<script>
	import Lock from '$lib/icons/unlock.svg';
	export let getValueFunction;
	export let endRoundFunction;
	let el;

	async function lockIn() {
		hide();
		let inputValue = getValueFunction();
		const answerRes = await fetch(`/api/get_answer?input=${inputValue}`);
		const answer = await answerRes.json();
		endRoundFunction(answer);
	}

	export const hide = () => {
		el.style.opacity = 0;
		el.style.display = 'none';
	};
	export const show = () => {
		el.style.display = 'block';
		el.style.opacity = 1;
	};
</script>

<button bind:this={el} on:click={lockIn}>
	<img src={Lock} alt="" />
	<i>Lock In</i>
</button>

<style>
	button {
		position: relative;
		width: 190px;
		height: 50px;
		background: #333333;
		color: rgb(223, 222, 198);
		font-size: 45px;
		display: flex;
		align-items: center;
		cursor: pointer;
		justify-content: space-evenly;
		border: 0;
		transition: width 0.1s ease;
		font-family: SofiaSans;
		text-transform: uppercase;
		font-weight: 800;
		gap: 10px;
	}
	button i {
		z-index: 2;
	}
	button img {
		width: 30px;
		z-index: 1;
		opacity: 0.3;
	}
	button:hover {
		width: 220px;
	}
</style>
