<script lang="ts">
	import type { User } from '@prisma/client';
	import Hexagon from '$lib/icons/hex.svg';

	export let userData: User = {
		username: '',
		rank: 0,
		country_code: '',
		last_stats_update: new Date(),
		stats_id: '',
		id: 1
	};

	let el: any;
	let flag: string;
	$: flag = `https://osu.ppy.sh/images/flags/${userData?.country_code}.png`;

	export const changeUser = (u: User) => (userData = u);

	export const hide = () => {
		el.style.opacity = 0;
	};

	export const show = () => {
		el.style.opacity = 1;
	};
</script>

<div class="played-by" bind:this={el}>
	<i class="title">Played By</i>
	<div class="profile">
		<img
			src={`https://s.ppy.sh/a/${userData?.id}`}
			style="mask-image: url({Hexagon}); -webkit-mask-image: url({Hexagon})"
			alt="your user icon"
			class="pic"
		/>
		<div class="text">
			<div class="top">
				<i>{userData?.username}</i>
				{#if userData.country_code}
					<img src={flag} alt="flag" class="flag" />
				{/if}
			</div>

			<div class="bottom">
				<i>#{userData?.rank?.toLocaleString()}</i>
			</div>
		</div>
	</div>
</div>

<style>
	.played-by {
		width: 235px;
		opacity: 0;
	}
	.title {
		display: block;
		font-family: SofiaSans;
		text-transform: uppercase;
		font-size: 24px;
		width: 235px;
		text-align: center;
		border-bottom: 1px white solid;
	}
	.profile {
		position: relative;
		color: white;
		background: 0;
		border: 0;
		text-align: left;
		height: 70px;
		border-top: 1px white solid;
		width: 225px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 3px;
		font-weight: bold;
		text-decoration: none;
		transition: all 0.3s ease;
	}
	.profile .pic {
		width: 60px;
		transition: all 0.3s ease;
		mask-size: 60px;
		-webkit-mask-size: 60px;
	}
	.text {
		font-family: SofiaSans;
		text-transform: uppercase;
		text-align: left;
		margin-left: 5px;
		font-size: 18px;
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
	.flag {
		margin-left: 5px;
		width: 20px;
		transition: all 0.5s ease;
	}
</style>
