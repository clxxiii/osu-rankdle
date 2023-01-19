<script lang="ts">
	let submitFormLink =
		'https://docs.google.com/forms/d/e/1FAIpQLSciZQRnhBvLTrxx-TBQ5a8u3u5b5vA39LLTlbSuvHqSx6OMHQ/viewform?usp=sf_link';
</script>

<a href={submitFormLink}>Submit your own replays!</a>

<style>
	a {
		position: relative;
		background-color: var(--dark);
		color: white;
		width: 200px;
		height: 50px;
		display: grid;
		place-items: center;
		border-radius: 10px;
		margin: 10px;
		font-weight: bold;
		text-decoration: none;
		overflow: hidden;
	}
	a::after {
		content: '';
		position: absolute;
		transition: 0.5s ease;
		top: 50%;
		left: 50%;
		height: 0%;
		width: 0%;
		backdrop-filter: invert(1);
		border-radius: 10px;
	}
	a:hover::after {
		width: 100%;
		left: 0%;
		height: 100%;
		top: 0%;
	}
</style>
