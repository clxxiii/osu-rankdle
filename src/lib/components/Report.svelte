<script lang="ts">
	import { browser } from '$app/environment';

	let el: HTMLDivElement;
	let text: HTMLDivElement;

	const expand = () => {
		el.style.width = '300px';
		el.style.height = '170px';
		el.style.backgroundColor = '#3d3d3d';
		el.style.cursor = 'default';
	};

	const shrink = () => {
		el.style.width = '120px';
		el.style.height = '20px';
		el.style.backgroundColor = 'var(--red)';
		el.style.cursor = 'pointer';
		other = false;
	};

	const report = async (msg: MouseEvent | KeyboardEvent) => {
		if (msg instanceof MouseEvent || msg.key == 'Enter') {
			await fetch(`/api/report?report=${msg.target.textContent}`, {
				method: 'POST'
			});
			el.textContent = '✓';
		}
	};

	let other = false;
	const enableOther = () => (other = true);

	export const hide = () => {
		el.style.display = 'none';
	};

	export const show = () => {
		el.style.display = 'block';
	};

	if (browser) {
		document.addEventListener('click', (ev) => {
			/* eslint-disable-next-line */
			const target: HTMLElement = ev.target;
			if (el == target) expand();
			else if (text == target) expand();
			else if (target.classList.contains('option')) expand();
			else shrink();
		});
	}
</script>

<div bind:this={el} class="report">
	<div class="text" bind:this={text}>Report Video</div>
	{#if !other}
		<button class="option" on:click={report}>This replay does not fairly reflect their rank</button>
		<button class="option" on:click={report}>This replay reveals the username/rank</button>
		<button class="option" on:click={report}>I cannot watch this replay, it is unavailable.</button>
		<button class="option" on:click={enableOther}>Other</button>
	{:else}
		<input type="text" placeholder="press enter to submit" class="option" on:keydown={report} />
	{/if}
</div>

<style>
	.report {
		/* display: none; */
		background-color: var(--red);
		margin-top: 15px;
		width: 120px;
		height: 20px;
		transition: 0.2s ease;
		padding: 5px 15px;
		cursor: default;
		text-align: center;
		overflow: hidden;
	}
	.report .text {
		margin-bottom: 5px;
	}

	.report button {
		width: 300px;
		height: 30px;
		cursor: pointer;
		margin-top: 5px;
		background: #303030;
		border: none;
		color: white;
		font-family: Quicksand;
	}
	.report button:hover {
		background: #252525;
		transform: translateX(-5px);
	}
	.report input {
		width: calc(100% - 10px);
		height: calc(100% - 30px);
		background: none;
	}
</style>
