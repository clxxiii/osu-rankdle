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
	let wrap: any;

	const closeBox = () => {
		if (!closeVar) return;
		hide();
	};
</script>

<div bind:this={wrap} class="wrap">
	<div on:click={closeBox} class="dark" />
	<div class="box">
		{#if closeVar}
			<img on:click={closeBox} src={close} alt="close button" />
		{/if}
		<slot />
	</div>
</div>

<style>
	.wrap {
		position: absolute;
		top: 0;
		width: 100vw;
		height: 100vh;
		z-index: 0;
		display: grid;
		place-items: center;
		transition: 0.3s ease;
	}
	.dark {
		position: absolute;
		top: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: -1;
	}
	.box {
		position: relative;
		width: 500px;
		height: 800px;
		background-color: #222222;
		z-index: 2;
		padding: 25px;
	}
	.box img {
		position: absolute;
		top: 0;
		right: 0;
		width: 40px;
		cursor: pointer;
	}
</style>
