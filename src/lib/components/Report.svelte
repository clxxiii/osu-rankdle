<script lang="ts">
	import type { Report } from "@prisma/client";
  import Hexagon from "$lib/icons/hex.svg";
  import DefaultPfp from "$lib/icons/user-octagon.svg";

  export let report: Report & { user: {user: {username: string; id: number; rank: number }}};
</script>

<div class="report">
  <i>"{report.reason}"</i>
  -
  {#if report.user.user}
    <a class="profile" href="https://osu.ppy.sh/u/{report.user.user.id}">
      <img 
        style="mask-image: url({Hexagon}); -webkit-mask-image: url({Hexagon})"
        src="https://s.ppy.sh/a/{report.user.user.id}" 
        alt=""
      >
      <div class="name">
        {report.user.user.username}
      </div>
      <div class="rank">
        #{report.user.user.rank.toLocaleString()}
      </div>
    </a>
  {:else}
    <span class="profile">
      <img src="{DefaultPfp}" alt="">
      <div class="name">Someone</div>
      <div class="rank">~</div>
    </span>
  {/if} 
</div>

<style>
  .report {
    display: flex;
    align-items: center;
    gap: 5px;
    padding-bottom: 5px;
    margin: 5px;
    border-bottom: 1px solid #3d3d3d;
  }
  i {
    font-weight: 600;
    color: var(--yellow);
  } 
  .profile {
    display: grid;
    color: white;
    font-family: SofiaSans;
    grid-template-columns: 45px 100%;
    grid-template-rows: 20px 20px;
  }
  img {
    width: 40px;
  }
  .name {
    grid-row: 1/2;
    grid-column: 2/3
  } 
  .rank {
    grid-column: 2/3;
    grid-row: 2/3
  }
</style> 
