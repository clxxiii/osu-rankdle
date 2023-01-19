<script lang="ts">
	import type { Video } from '@prisma/client';
	import MiniInput from './MiniInput.svelte';

	export let id: string;
	export let guess_num: number;
	export let input: number;
	export let penalty: number;
	export let video: Video;
</script>

<tr>
	<a class="guess" href="/guess/{id}">
		<td class="num">{guess_num}</td>
		<td class="input">{input}</td>
		<td class="answer">{video.shown_rank}</td>
		<td class="penalty">-{penalty}</td>
		<td><MiniInput {input} answer={video.shown_rank} /></td>
	</a>
</tr>

<style>
	a {
		color: white;
		height: 50px;
		text-decoration: none;
		border-bottom: 2px solid rgb(75, 75, 75);
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		width: 680px;
		font-size: 12px;
		/* font-family: SofiaSans; */
	}
	.num {
		font-size: 24px;
	}
</style>
