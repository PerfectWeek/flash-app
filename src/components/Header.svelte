<script>
  import Title from "./Title.svelte";
</script>

<style>
  .center {
    margin: auto;
  }

  .title {
    border-bottom: solid 2px;
    font-size: 1rem;
    cursor: default;
    margin: 1rem auto;
  }
</style>

<header class="navbar">
  <section class="center title">
    <Title clickable={false} />
  </section>
</header>
