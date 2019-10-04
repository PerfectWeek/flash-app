<script>
  export let home;
</script>

<style>
  .title {
    border-bottom: solid 2px;
    font-size: 1rem;
    cursor: pointer;
    margin: 1rem auto;
  }
</style>

<header class="navbar">
  <section class="navbar-center title">
    <h2 on:click={home}>
      Flash
      <i>by PerfectWeek</i>
    </h2>
  </section>
</header>
