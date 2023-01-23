<script lang="ts">
	import { Converter } from 'showdown';
	export let article: any;

  console.log(article.date);
	const converter = new Converter({ tables: true, metadata: true });
	const articleContent = converter.makeHtml(article.data);
</script>

{#if article.title}
	<h1>
		{#if article.date}
			<span class="date">
				{article.date}
			</span>
		{/if}
		{article.title}
	</h1>
	<article>
		{@html articleContent}
	</article>
{/if}

<style>
	h1 {
		font-size: 1.7em;
	}
	h1 .date {
		background-color: var(--yellow);
		padding: 5px;
		color: #222222;
	}
	article {
		border-bottom: 2px solid #3d3d3d;
	}
</style>
