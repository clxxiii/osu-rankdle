<script lang="ts">
	import heart from '$lib/icons/heart.svg';
	import heartbreak from '$lib/icons/heartbreak.svg';

	let maxHP = 2000;
	let bar: any;
	let hpbar: any;
	let hptextbox: any;

	export let hp = maxHP;
	export const set = (num: number) => {
		hp = num;
		hp = hp > maxHP ? maxHP : hp;
		hp = hp < 0 ? 0 : hp;

		hpbar.style.width = `${(hp / maxHP) * 100}%`;
		hptextbox.textContent = `${hp.toLocaleString()}`;
	};
	export const reset = () => set(maxHP);
	export const kill = () => set(0);
	export const heal = (num: number) => set(hp + num);
	export const hit = (num: number) => {
		set(hp - num);
		bar.style.animation = 'hit 0.3s linear';
		setTimeout(() => (bar.style.animation = ''), 1000);
	};
</script>

<div class="bar" bind:this={bar}>
	<div class="head">
		{#if hp > 0}
			<img src={heart} alt="heart" />
		{:else}
			<img src={heartbreak} alt="heartbreak" />
		{/if}
	</div>
	<div class="health">
		<div class="display">
			<div class="value" style="width: {(hp / maxHP) * 100}%" bind:this={hpbar} />
		</div>
	</div>
	<div class="number" bind:this={hptextbox}>{hp.toLocaleString()}</div>
</div>

<style>
	.bar {
		position: relative;
		margin: 40px;
		width: 500px;
		height: 50px;
		z-index: 0;
	}
	.head {
		position: absolute;
		top: 0;
		background: rgb(100, 100, 100);
		width: 50px;
		height: 50px;
		border-radius: 50px;
		display: grid;
		box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
		place-items: center;
		z-index: 1;
	}
	.head img {
		transform: translateY(2px);
		width: 30px;
		height: 30px;
	}
	.health {
		position: absolute;
		top: 2px;
		left: 25px;
		width: 500px;
		height: 35px;
		background: rgb(66, 66, 66);
		border-bottom-right-radius: 50px;
		border-top-right-radius: 10px;
	}
	.display {
		position: absolute;
		background-color: rgb(27, 27, 27);
		box-shadow: inset 0 0 5px rgb(36, 36, 36);
		inset: 5px;
		overflow: hidden;
		right: 7px;
		border-bottom-right-radius: 50px;
		border-top-right-radius: 10px;
	}

	.value {
		transition: 0.3s ease;
		position: absolute;
		background-color: var(--sky);
		top: 0px;
		left: 0px;
		bottom: 0px;
		width: 100%;
		border-bottom-right-radius: 5px;
		border-top-right-radius: 5px;
	}
	.number {
		background-color: rgb(44, 44, 44);
		position: absolute;
		bottom: -7px;
		left: 25px;
		height: 20px;
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
		display: grid;
		place-items: center;
		font-size: 16px;
		width: 17%;
	}
	@keyframes hit {
		0% {
			transform: translate(0px, 10px);
		}
		10% {
			transform: translate(10px, 10px);
		}
		20% {
			transform: translate(0px, 0px);
		}
		30% {
			transform: translate(5px, 10px);
		}
		40% {
			transform: translate(0px, 5px);
		}
		50% {
			transform: translate(5px, 10px);
		}
		60% {
			transform: translate(0px, 0px);
		}
		70% {
			transform: translate(0px, 10px);
		}
		80% {
			transform: translate(10px, 0px);
		}
		90% {
			transform: translate(5px, 10px);
		}
		100% {
			transform: translate(0px, 0px);
		}
	}
</style>
