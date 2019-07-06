<script>
  import { Router, Route, Link } from "svelte-routing";

  import Home from "./components/Home.svelte";
  import Room from "./components/Room.svelte";

  export let url = "";
</script>

<style>
  .app {
    background: linear-gradient(160deg, #1c4891, #5abc95);
    height: 100%;
    font-size: 1em;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    justify-content: space-between;
  }

  .header {
    display: flex;
    justify-content: space-around;
  }


  .title {
    border-bottom: solid 1px;
    margin: auto;
    padding: 3vh 1vw 1vh 1vw;
    vertical-align: middle;
    font-size: 3rem;
  }

  .footer {
    text-align: right;
    margin: 0 2vw 2vh 0;
  }
</style>

<div class="app">
  <div class="header">
    <h1 class="title">
      Flash
      <i>by PerfectWeek</i>
    </h1>
  </div>

  <Router {url}>
    <div class="content">
      <Route path="/" component={Home} />
      <Route path="room" component={Room} />
    </div>
  </Router>

  <div class="footer">© PerfectWeek 2019</div>
</div>
