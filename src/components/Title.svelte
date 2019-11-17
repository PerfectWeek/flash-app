<script>
  import { navigate } from "svelte-routing";

  export let clickable;

  function home() {
    if (clickable) {
      navigate("/");
    }
  }
</script>

<style>
  .clickable {
    cursor: pointer;
  }

</style>

<div class="title">
<h2 class={clickable ? 'clickable' : ''} on:click={home}>
  Flash
  <i>by PerfectWeek</i>
</h2>
</div>
