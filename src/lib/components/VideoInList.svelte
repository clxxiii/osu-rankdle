<script lang="ts">
	import type { User, Video } from '@prisma/client';
	import Hexagon from '$lib/icons/hex.svg';
	import { onMount } from 'svelte';

	export let video: Video & { user: User; guesses_for: [{ stats_id: string }] };

	let flag = `https://osu.ppy.sh/images/flags/${video.user?.country_code}.png`;

	let el: HTMLAnchorElement;
	let rankText: HTMLDivElement;
	let guessText: HTMLDivElement;

	onMount(() => {
		if (video.removed) {
			el.style.backgroundColor = 'var(--red)';
			rankText.style.color = 'var(--light-red)';
			rankText.textContent = 'REMOVED';
			guessText.style.color = 'var(--light-red)';
		}
	});
</script>

<a href="/videos/{video.id}" bind:this={el}>
	<img
		class="thumbnail"
		src="https://i3.ytimg.com/vi/{video.youtube_id}/maxresdefault.jpg"
		alt="thumbnail"
	/>

	<div class="profile">
		<img
			style="mask-image: url({Hexagon}); -webkit-mask-image: url({Hexagon})"
			src={`https://s.ppy.sh/a/${video.user.id}`}
			alt="user icon"
			class="pic"
		/>
		<div class="login-text">
			<div class="top"><i>{video.user.username}</i></div>
			<div class="bottom">
				<i>#{video.user.rank.toLocaleString()}</i>
				<img src={flag} alt="flag" class="flag" />
			</div>
		</div>
	</div>
  {#if video.reports.length >= 1}
    <div class="report">{video.reports.length} Report{video.reports.length != 1 ? "s" : ""}!</div>
  {/if}
	<div class="guesses" bind:this={guessText}>{video.guesses_for.length}</div>
	<div class="rank" bind:this={rankText}><i>#{video.shown_rank.toLocaleString()}</i></div>
</a>

<style>
	a {
		position: relative;
		background-color: #222222;
		display: flex;
		gap: 20px;
		width: 520px;
		padding: 10px;
		padding-top: 30px;
		margin: 5px;
		color: inherit;
		align-items: center;
		justify-content: space-between;
		text-decoration: none;
	}
	.thumbnail {
		height: 80px;
		aspect-ratio: calc(16 / 9);
	}
	.pic {
		--width: 45px;
		height: var(--width);
		aspect-ratio: 1;
		mask-size: var(--width);
		-webkit-mask-size: var(--width);
	}
	.profile {
		display: flex;
		align-items: center;
		gap: 5px;
	}
  .report {
    position: absolute; 
    bottom: 5px;
    right: 5px;
    color: var(--yellow);
    font-weight: 900;
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
	.rank {
		color: #3d3d3d;
		font-weight: 700;
		font-family: SofiaSans;
		font-size: 50px;
	}
	.guesses {
		position: absolute;
		top: 5px;
		left: 10px;
		font-weight: 900;
		font-family: SofiaSans;
		color: #3d3d3d;
	}

	@media screen and (max-width: 600px) {
		a {
			flex-direction: column;
			gap: 5px;
			width: 180px;
		}
		.thumbnail {
			height: 100px;
		}
		.rank {
			font-size: 24px;
		}
	}
</style>
