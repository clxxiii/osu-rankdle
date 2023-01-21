<script lang="ts">
	import close from '$lib/icons/x.svg';
	export const visible = true;
	export let closeable = 'true';

	const closeVar = closeable == 'true';

	export const show = () => {
		if (visible) return;
		wrap.style.opacity = '1';
		wrap.style.pointerEvents = 'all';
	};
	export const hide = () => {
		if (!visible) return;
		wrap.style.opacity = '0';
		wrap.style.pointerEvents = 'none';
	};
	let wrap: HTMLDivElement;

	const closeBox = () => {
		if (!closeVar) return;
		hide();
	};
</script>

<div bind:this={wrap} class="wrap">
	<button on:click={closeBox} class="dark" />
	<div class="box">
		{#if closeVar}
			<button on:click={closeBox}><img src={close} alt="close button" /></button>
		{/if}
		<slot />
	</div>
</div>

<style>
	.wrap {
		position: fixed;
		top: 0;
		width: 100vw;
		height: 100vh;
		display: grid;
		z-index: 2;
		place-items: center;
		transition: 0.3s ease;
	}
	.dark {
		position: absolute;
		top: 0;
		width: 100vw;
		height: 100vh;
		border: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: -1;
	}
	.box {
		position: relative;
		width: 80vw;
		height: 80vw;
		max-width: 500px;
		max-height: 400px;
		background-color: #222222;
		z-index: 2;
		padding: 25px;
	}
	.box button {
		position: absolute;
		top: 0;
		right: 0;
		background: 0;
		border: 0;
	}
	.box img {
		position: absolute;
		top: 0;
		right: 0;
		width: 40px;
		cursor: pointer;
	}
</style>
