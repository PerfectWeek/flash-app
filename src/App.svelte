<script>
  import { Router, Route, Link, navigate } from "svelte-routing";

  import Home from "./components/Home.svelte";
  import Room from "./components/Room.svelte";

  export let url = "";
  export let requestPlugin;
  export let QRCodePlugin;

  function home() {
    navigate("/");
  }
</script>

<style>
  .app {
    background: linear-gradient(160deg, #1c4891, #5abc95);
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    justify-content: space-between;
  }

  .title {
    border-bottom: solid 1px;
    font-size: 1rem;
    cursor: pointer;
    margin: 1rem auto;
  }

  .footer {
    text-align: right;
    margin: 0 2vw 2vh 0;
  }

</style>

<div class="app">
  <header class="navbar">
    <section class="navbar-center title text-light">
      <h2 on:click={home}>
        Flash
        <i>by PerfectWeek</i>
      </h2>
    </section>
  </header>
  <Router {url}>
    <Route path="/" component={Home} {requestPlugin} />
    <Route path="/:id" component={Room} {requestPlugin} {QRCodePlugin} />
  </Router>

  <div class="footer">© PerfectWeek 2019</div>
</div>
