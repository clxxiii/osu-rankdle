<div class="faq">
	<h1>Frequently Asked Questions</h1>

	<section id="hp">
		<h2>How does HP work?</h2>
		<p>
			<b>Simply put,</b> after you guess, the server generates a number based on the <b>distance</b>
			between your guess location, and the answer location on the slider.
		</p>
		<p>
			If you want to know more, you can check the
			<a href="https://github.com/clxxiii/osu-rankdle.git">source code</a>. A normalization formula
			is applied to the slider, so that roughly, 1k vs 2k are the same distance as 200k vs 100k.
		</p>
	</section>
	<section id="hp-reset">
		<h2>Why can I only play once per day?</h2>
		<p><b>Not enough videos!</b></p>
		<p>
			During testing, I had the ability to see the 10-15 videos that the service had the option of
			picking, and I very quickly ran out of videos I hadn't seen. And that was during development,
			while I had other tasks than just spamming retry.
		</p>
		<p>
			If you wanna log out and log in again to get more chances, there's nothing stopping you, so
			you're welcome to do that. Although I suggest heavily against it, as it will get boring very
			quickly.
		</p>
		<p>
			Plans are in motion for a freeplay mode, which will disable the "I've already seen this"
			filter, and a leaderboard which will incentivize playing the daily mode
		</p>
	</section>
	<section id="submit">
		<h2>Why does the submit button just take you to a Google Form?</h2>
		<p>
			The plan is to eventually alleviatea the need for Google forms, and YouTube altogether. For
			now, while I wait for more videos to come, and to learn more about custom file hosting, we're
			using this system.
		</p>
		<p>
			Besides, it's more than just a redirect anyway. The submit button automatically fetches the
			data we have about your osu! profile, and autofills those fields so you don't have to go find
			them yourself.
		</p>
	</section>
	<section id="contribute">
		<h2>Can I contribute?</h2>
		<p>
			You're already contributing by simply sharing and using this site. Seriously, word spreads
			fast in this community, using this site, providing bug reports and sharing your results helps
			immensely.
		</p>
		<p>
			If you're feeling <b>super</b> generous, the
			<a href="https://github.com/clxxiii/osu-rankdle.git">source code</a> is publicly available, and
			contributions are welcome!
		</p>
		<p>
			If you're feeling <b>super super super</b> generous, toss me a few bucks through my
			<a href="https://ko-fi.com/clxxiii">ko-fi campaign</a>. As you have probably heard a million
			times by now, hosting costs are not free, and while I've done my best to try and lower them
			for myself as much as I can, your contributions mean the world.
		</p>
	</section>
	<section id="video-delay">
		<h2>I submitted a video, why isn't it showing up?</h2>
		<p>
			Long story short, youtube only allows 10 uploads perday. I'm trying my best to chug through
			all the ones that were uploaded as mp4s, but it's gonna take a little while.
		</p>
		<p>
			osu! replay file (.osr) support is sadly probably going to take a while. I technically <i
				>could</i
			> convert them all using danser, but I would run into the same issue.
		</p>
		<p>
			The plan for osu! replay files is to make a live render of the replay file in the browser,
			that shows the map in the background with all the hit judgements. If anyone has knowledge on
			how to do that, I could definitely use some help, so please reach out!
		</p>
	</section>
</div>

<style>
	.faq {
		margin: 20px;
		width: 70%;
		max-width: 1000px;
	}
	h1 {
		color: var(--yellow);
	}
	h2 {
		color: var(--sky);
	}
	a {
		color: var(--yellow);
	}
</style>
