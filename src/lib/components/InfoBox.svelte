<script lang="ts">
  export const visible = true;
  export const show = () => {

  }
  const closeBox = () => {
   if (!visible) return;

  }
  let dark;
</script>

<div bind:this={dark} on:click={closeBox} class="dark">
  <div class="box"></div>
</div>

<style>
  .dark {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    backdrop-filter: blur(5px);
    display: grid;
    place-items: center;
  }
  .box {
    width: 500px;
    height: 800px;
    background-color: #222222;
  }
</style>
