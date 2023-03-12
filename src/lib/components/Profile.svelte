<script lang="ts">
	import Hex from '$lib/icons/hex.svg';
	import type { User } from '@prisma/client';

	export let user: User;
	export let scale: number;
	let flag = `https://osu.ppy.sh/images/flags/${user.country_code}.png`;
</script>

<a class="profile" style="--scale: {scale}px" href="https://osu.ppy.sh/u/{user.id}">
	<img
		class="pfp"
		src="https://s.ppy.sh/a/{user.id}"
		alt="profile"
		style="mask-image: url({Hex}); -webkit-mask-image: url({Hex})"
	/>
	<div class="name">
		<i>{user.username}</i>

		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
			/>
		</svg>
	</div>
	<div class="rank-flag">
		<div class="rank"><i>#{user.rank.toLocaleString()}</i></div>
		<img src={flag} alt="flag" class="flag" />
	</div>
</a>

<style>
	a {
		text-decoration: none;
		color: white;
	}
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
	.name svg {
		width: calc(var(--scale) / 3.25);
		transform: translate(10%, 10%);
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
