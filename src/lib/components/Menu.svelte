<script lang="ts">
	import User from '$lib/icons/user-octagon.svg';
	import Hexagon from '$lib/icons/hex.svg';
	import type { User as UserType } from '@prisma/client';
	export let userData: UserType;

	let dark: HTMLDivElement;
	let darkNoAccount: HTMLDivElement;
	let profile: HTMLButtonElement;

	let flag = `https://osu.ppy.sh/images/flags/${userData?.country_code}.png`;

	let menuShown = false;
	const toggleMenu = () => {
		if (!menuShown) {
			// Show
			if (dark) {
				dark.style.inset = '0';
				dark.style.opacity = '1';
				dark.style.pointerEvents = 'all';
			}
			if (darkNoAccount) {
				darkNoAccount.style.inset = '0';
				darkNoAccount.style.opacity = '1';
				darkNoAccount.style.pointerEvents = 'all';
			}
		} else {
			// Hide
			if (dark) {
				setTimeout(() => (dark.style.inset = '50%'), 500);
				dark.style.opacity = '0';
				dark.style.pointerEvents = 'none';
			}
			if (darkNoAccount) {
				setTimeout(() => (darkNoAccount.style.inset = '50%'), 500);
				darkNoAccount.style.opacity = '0';
				darkNoAccount.style.pointerEvents = 'none';
			}
		}

		menuShown = !menuShown;
	};
</script>

{#if !userData}
	<button class="profile" on:click={toggleMenu}>
		<img src={User} alt="blank user icon" />
		<div class="login-text">
			<div class="top"><i>login</i></div>
			<div class="bottom"><i>to submit clips</i></div>
		</div>
	</button>
	<div on:click={toggleMenu} on:keydown|self={toggleMenu} class="dark" bind:this={darkNoAccount}>
		<div class="head">
			<i>Hey there!</i>
		</div>
		<a href="/api/login">login</a>
		<a href="/">HOME</a>
		<a href="/faq">FAQ</a>
	</div>
{:else}
	<button bind:this={profile} class="profile shrink" on:click={toggleMenu}>
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
	</button>
	<div on:click={toggleMenu} on:keydown|self={toggleMenu} class="dark" bind:this={dark}>
		<div class="head">
			<i>Howdy, <span class="name">{userData.username}</span></i>
		</div>
		<a href="/">HOME</a>
		<a href="/faq">FAQ</a>
		<a href="/api/submit_form_link">submit</a>
		<a href="/api/logout">logout</a>
	</div>
{/if}

<style>
	.dark {
		position: fixed;
		inset: 50%;
		background: rgba(0, 0, 0, 0.75);
		transition: opacity 0.3s ease;
		backdrop-filter: blur(5px);
		opacity: 0;
		border: 0;
		pointer-events: none;
		overflow: hidden;
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.dark .head {
		font-size: 48px;
		font-family: SofiaSans;
		text-transform: uppercase;
	}
	.dark .head .name {
		color: var(--sky);
	}
	.dark a {
		position: relative;
		color: white;
		text-decoration: none;
		text-transform: uppercase;
		margin: 10px 0px;
		padding: 10px;
		pointer-events: all;
	}
	.dark a::after {
		content: '';
		position: absolute;
		bottom: -1px;
		left: 50%;
		width: 0%;
		height: 2px;
		background-color: white;
		transition: 0.3s ease;
	}
	.dark a:hover::after {
		left: 0%;
		width: 100%;
	}
	.profile {
		position: fixed;
		top: 0;
		right: 0;
		color: white;
		background: 0;
		border: 0;
		text-align: left;
		height: 50px;
		display: flex;
		align-items: center;
		border-radius: 10px;
		margin: 10px;
		font-weight: bold;
		text-decoration: none;
		cursor: pointer;
		transition: all 0.3s ease;
		z-index: 11;
	}
	.profile .pic {
		width: 45px;
		transition: all 0.3s ease;
		mask-size: 45px;
		-webkit-mask-size: 45px;
	}
	.login-text {
		font-family: SofiaSans;
		text-transform: uppercase;
		text-align: left;
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

	@media screen and (max-width: 500px) {
		.login-text {
			display: none;
		}
		.profile:hover {
			transform: translateX(0px);
		}
	}
</style>
