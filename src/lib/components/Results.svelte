<script lang="ts">
	import InfoBox from './InfoBox.svelte';

	type Data = {
		streak: number;
		longest_streak: number;
		highest_score: number;
		score: number;
		recap_url: string | null;
	};
	let box: any;
	export let data: Data;

	export const show = (d: Data) => {
		data = d;
		box.show();
	};
</script>

<InfoBox bind:this={box}>
	<div class="lifetime">
		<div class="streak">{data.streak}</div>
		<div class="long">{data.longest_streak}</div>
		<div class="high">{data.highest_score}</div>
	</div>
	<div class="score">{data.score}</div>
</InfoBox>
