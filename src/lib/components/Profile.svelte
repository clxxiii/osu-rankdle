<script lang="ts">
	import Hex from '$lib/icons/hex.svg';
	import type { User } from '@prisma/client';

	export let user: User;
	export let scale: number;
	let flag = `https://osu.ppy.sh/images/flags/${user.country_code}.png`;
</script>

<div class="profile" style="--scale: {scale}px">
	<img
		class="pfp"
		src="https://s.ppy.sh/a/{user.id}"
		alt="profile"
		style="mask-image: url({Hex}); -webkit-mask-image: url({Hex})"
	/>
	<div class="name"><i>{user.username}</i></div>
	<div class="rank-flag">
		<div class="rank"><i>#{user.rank.toLocaleString()}</i></div>
		<img src={flag} alt="flag" class="flag" />
	</div>
</div>

<style>
	.profile {
		display: grid;
		grid-template-columns: var(--scale) calc(50% - var(--scale) / 2) calc(50% - var(--scale) / 2);
		grid-template-rows: calc(var(--scale) / 2) calc(var(--scale) / 2) calc(var(--scale) / 3);
		font-family: 'SofiaSans';
		align-items: center;
		width: calc(var(--scale) * 4.5);
	}
	.pfp {
		width: var(--scale);
		height: var(--scale);
		grid-row: 1/3;
	}
	.name {
		font-weight: 400;
		text-transform: uppercase;
		font-size: calc(var(--scale) / 3.25);
		margin-left: 3%;
		grid-column: 2/4;
		align-self: flex-end;
	}
	.rank-flag {
		display: flex;
		gap: 5%;
		grid-column: 2/3;
		grid-row: 2/3;
		align-items: center;
	}
	.rank {
		font-weight: 200;
		font-size: calc(var(--scale) / 3.25);
	}
	.flag {
		aspect-ratio: calc(16 / 10);
		height: calc(var(--scale) / 4);
	}
</style>
