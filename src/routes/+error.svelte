<script>
	import { page } from '$app/stores';
	import Logo from '$lib/icons/i made this in 2 seconds.svg';
	import '../app.css';
</script>

<svelte:head>
	<title>{$page.status} - {$page.error.message}</title>
</svelte:head>

<div class="e">
	<img src={Logo} alt="" />
	<b>{$page.status} - {$page.error.message}</b>
	<a href="/">Back to home</a>
</div>

<style>
	.e {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		font-family: 'Quicksand';
		background-color: #222222;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.e img {
		width: 25vw;
	}
	a {
		position: relative;
		color: #ffec90;
		text-decoration: none;
	}
	a::after {
		content: '';
		position: absolute;
		bottom: -1px;
		left: 50%;
		width: 0%;
		background-color: #ffec90;
		height: 2px;
		border-radius: 4px;
		transition: 0.5s ease;
	}
	a:hover::after {
		left: 0%;
		width: 100%;
	}
</style>
