<script lang="ts">
	import { getDay } from '$lib/constants';
	import InfoBox from './InfoBox.svelte';
	import Timer from './Timer.svelte';

	let box: InfoBox;
	export let streak: number;
	export let longest_streak: number;
	export let highest_score: number;
	export let score: number;
	export let stats_id: string;

	export const show = () => {
		box.show();
	};
</script>

<InfoBox bind:this={box}>
	<div class="all">
		<div class="lifetime">
			<div class="streak">
				<div class="num">{streak}</div>
				Streak
			</div>
			<div class="long">
				<div class="num">{longest_streak}</div>
				Longest Streak
			</div>
			<div class="high">
				<div class="num">{highest_score}</div>
				Highest Score
			</div>
		</div>
		<div class="score">
			Score <div class="num">{score}</div>
		</div>
		<a class="results" href="/results/{stats_id}/{getDay()}"><span> Share your results! </span></a>
		<div class="timer">
			<Timer />
		</div>
	</div>
</InfoBox>

<style>
	.all {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.num {
		font-weight: bold;
		font-size: 48px;
	}
	.streak,
	.long,
	.high,
	.score {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 150px;
	}
	.score {
		transform: scale(1.5) translatey(20px);
	}
	.lifetime {
		display: flex;
		width: 80%;
		justify-content: space-around;
		margin-bottom: 30px;
	}
	.results {
		position: absolute;
		background-color: #3d3d3d;
		padding: 15px;
		bottom: 100px;
		transform: skew(-15deg);
		color: white;
		text-decoration: none;
		transition: 0.2s ease;
	}
	.results span {
		display: block;
		width: 100%;
		height: 100%;
		transform: skew(15deg);
		transition: 0.2s ease;
	}
	.results:hover {
		transform: skew(0deg);
	}
	.results:hover span {
		transform: skew(0deg);
	}
	.timer {
		position: absolute;
		bottom: 0px;
	}
</style>
