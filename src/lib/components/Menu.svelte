<script>
	import User from '$lib/icons/user-octagon.svg';
	import Hexagon from '$lib/icons/hex.svg';
	export let userData;

	let submitFormLink =
		'https://docs.google.com/forms/d/e/1FAIpQLSciZQRnhBvLTrxx-TBQ5a8u3u5b5vA39LLTlbSuvHqSx6OMHQ/viewform?usp=sf_link';

	let flag = `https://osu.ppy.sh/images/flags/${userData.country_code}.png`;
</script>

{#if !userData}
	<a class="profile" href="/api/login">
		<img src={User} alt="blank user icon" />
		<div class="login-text">
			<div class="top"><i>login</i></div>
			<div class="bottom"><i>to submit clips</i></div>
		</div>
	</a>
{:else}
	<div class="profile">
		<img
			src={`https://s.ppy.sh/a/${userData.id}`}
			style="mask-image: url({Hexagon}); -webkit-mask-image: url({Hexagon})"
			alt="your user icon"
			class="pic"
		/>
		<div class="login-text">
			<div class="top"><i>{userData.username}</i></div>
			<div class="bottom">
				<i>#{userData.rank.toLocaleString()}</i>
				<img src={flag} alt="flag" class="flag" />
			</div>
		</div>
	</div>
{/if}

<style>
	.profile {
		position: relative;
		color: white;
		/* width: 180px; */
		height: 50px;
		display: flex;
		align-items: center;
		border-radius: 10px;
		margin: 10px;
		font-weight: bold;
		text-decoration: none;
		cursor: pointer;
		transition: all 0.5s ease;
	}
	.profile .pic {
		width: 40px;
		transition: all 0.3s ease;
		mask-size: 40px;
		-webkit-mask-size: 40px;
	}
	.login-text {
		font-family: SofiaSans;
		text-transform: uppercase;
	}
	.top {
		font-weight: 400;
		margin-left: 5px;
		transition: all 0.3s ease;
	}
	.bottom {
		font-weight: 200;
		transition: all 0.5s ease;
		display: flex;
		align-items: center;
	}
	.profile:hover {
		transform: translateX(-15px);
	}
	.profile:hover .pic {
		transform: scale(1.05);
	}
	.flag {
		margin-left: 5px;
		width: 20px;
		transition: all 0.5s ease;
	}
	.profile:hover .top,
	.profile:hover .bottom {
		transform: translateX(5px);
	}
	.profile:hover .flag {
		transform: translateX(5px);
	}
</style>
