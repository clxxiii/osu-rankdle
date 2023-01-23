<script>
	import Socials from './Socials.svelte';
</script>

<div class="links">
	<a href="/faq">FAQ</a>
	<a href="/changelog">Changelog</a>
</div>
<Socials />

<style>
	.links {
		position: absolute;
		bottom: 5px;
		height: 40px;
		width: calc(100% - 90px);
		display: flex;
		justify-content: space-around;
	}
	a {
		position: relative;
		color: #666666;
		font-weight: 600;
		text-decoration: none;
	}
	a::after {
		content: '';
		width: 0%;
		left: 50%;
		position: absolute;
		bottom: 15px;
		border-radius: 5px;
		transition: 0.2s ease;
		background-color: #666666;
		height: 3px;
	}
	a:hover::after {
		left: 0%;
		width: 100%;
	}
</style>
