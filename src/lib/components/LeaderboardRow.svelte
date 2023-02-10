<script lang="ts">
	import type { User } from '@prisma/client';
	import Hexagon from '$lib/icons/hex.svg';

	type Data = {
		user: User;
		history: { day: number }[];
		_count: {
			sessions: number;
			history: number;
			guesses: number;
			reports: number;
		};
	};

	export let user: Data;
	export let index: number;

	let flag = `https://osu.ppy.sh/images/flags/${user?.user?.country_code}.png`;
</script>

<a class="row" href="/results/{user?.user?.stats_id}">
	<div class="index">{index}</div>
	<div class="profile">
		{#if user.user}
			<img
				style="mask-image: url({Hexagon}); -webkit-mask-image: url({Hexagon})"
				src="https://s.ppy.sh/a/{user.user.id}"
				alt="pfp"
				class="pic"
			/>
			<div class="login-text">
				<div class="top"><i>{user.user.username}</i></div>
				<div class="bottom">
					<i>#{user.user.rank.toLocaleString()}</i>
					<img src={flag} alt="" class="flag" />
				</div>
			</div>
		{/if}
	</div>
	<div class="score">{user._count.guesses}</div>
	<div class="days">{user._count.history}</div>
	<div class="first-day">{user?.history[0]?.day}</div>
</a>

<style>
	.row {
		display: grid;
		height: 50px;
		place-items: center;
		grid-template-columns: 50px 25% 25% 25% 25% 25%;
		color: white;
		text-decoration: none;
	}
	.index,
	.days,
	.first-day {
		color: #999999;
	}
	.profile {
		color: white;
		background: 0;
		border: 0;
		text-align: left;
		height: 50px;
		display: flex;
		align-items: center;
		border-radius: 10px;
		font-weight: bold;
		text-decoration: none;
		cursor: pointer;
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
	.flag {
		margin-left: 5px;
		width: 20px;
		transition: all 0.5s ease;
	}
	.row:hover {
		background-color: #222222;
	}

	@media screen and (max-width: 450px) {
		.pic,
		.bottom {
			display: none;
		}
	}
</style>
