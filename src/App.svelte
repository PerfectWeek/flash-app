<script>
  import { Router, Route, Link, navigate } from "svelte-routing";

  import Header from "./components/Header.svelte";
  import Home from "./components/Home.svelte";
  import Room from "./components/Room.svelte";
  import Auth from "./components/Auth.svelte";
  import Footer from "./components/Footer.svelte";

  export let url = "";

  function home() {
    navigate("/");
  }
</script>

<style>
  .app {
    background-color: white;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    justify-content: space-between;
  }
</style>

<div class="app">
  <Header {home} />
  <Router {url}>
    <Route path="/" component={Home} />
    <Route path="/:id" component={Room} />
    <Route path="/auth" component={Auth} />
  </Router>
  <Footer />
</div>
