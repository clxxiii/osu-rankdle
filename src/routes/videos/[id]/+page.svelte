<script lang="ts">
	import PlayedBy from '$lib/components/PlayedBy.svelte';
	import Report from '$lib/components/Report.svelte';
	import StatsSlider from '$lib/components/StatsSlider.svelte';
	import Video from '$lib/components/Video.svelte';
	import type { Report as ReportType, User, Video as VideoType } from '@prisma/client';
	import { onMount } from 'svelte';

	let playedBy: PlayedBy;
	type Guess = {
		input: number;
		penalty: number;
		stats: {
			user: {
				id: number;
				username: string;
				rank: number;
			};
		};
	};
	type Data = {
		guesses: Guess[];
		video: VideoType & { user: User };
    reports: [ ReportType & {user: {user: {username: string; id: number; rank: number}}} ]
	};
	export let data: Data;
	onMount(() => playedBy.show());

	let penaltyArray = data.guesses.map((x) => x.penalty);
	let guessArray = data.guesses.map((x) => x.input);
	console.log({ penaltyArray, guessArray });

	let avgPenalty = 0;
	let avgGuess = 0;
	let mostWrong = 0;
	let mostRight = 3_000_000; // A number larger than the largest possible guess, so the first guess will always be closer

	for (const pen of penaltyArray) {
		avgPenalty += pen;
	}
	avgPenalty /= penaltyArray.length;

	for (const guess of guessArray) {
		avgGuess += guess;

		if (Math.abs(data.video.shown_rank - guess) > mostWrong) {
			mostWrong = guess;
		}

		if (Math.abs(data.video.shown_rank - guess) < mostRight) {
			mostRight = guess;
		}
	}
	avgGuess /= guessArray.length;
</script>

<div class="page">
	<div class="vid">
		<Video video_id={data.video.youtube_id} />
	</div>
	<div class="user">
		<PlayedBy bind:this={playedBy} userData={data.video.user} />
	</div>
	<StatsSlider guesses={data.guesses} answer={data.video.shown_rank} />
	<div class="stats">
		<ul>
			<li>Average HP lost from this video: <span>{avgPenalty.toLocaleString()}</span></li>
			<li>Average Rank Guessed: <span>{avgGuess.toLocaleString()}</span></li>
			<li>Most wrong guess: <span>{mostWrong.toLocaleString()}</span></li>
			<li>Most right guess: <span>{mostRight.toLocaleString()}</span></li>
		</ul>
	</div>
  {#if data.reports?.length > 0}
    <div class="reports">
    <h3>Reports</h3>
      <div class="list">
        {#each data.reports as report}
          <Report {report}/>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
	.page {
		margin: auto;
		margin-top: 70px;
		max-width: 910px;
		min-height: calc(100vh - 70px);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		align-content: center;
	}
  .reports {
    width: 75%
  }
  .reports h3 {
    border-bottom: 2px solid var(--yellow);
    color: var(--yellow);
    line-height: 1.7em;
  }
  .reports .list {
    max-height: 400px;
    overflow-y: scroll;
  }
	.user {
		display: flex;
		justify-content: center;
	}
	ul {
		position: relative;
		list-style: none;
	}
	ul::before {
		content: '';
		position: absolute;
		top: -5%;
		left: 1.7em;
		height: 110%;
		width: 3px;
		border-radius: 5px;
		background-color: #3d3d3d;
	}
	.user,
	.stats {
		width: 350px;
	}
</style>
