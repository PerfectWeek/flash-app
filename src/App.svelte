<script>
  import { Router, Route, Link, navigate } from "svelte-routing";

  // FullCalendar style files
  import "../node_modules/@fullcalendar/core/main.css";
  import "../node_modules/@fullcalendar/timegrid/main.css";
  import "./css/calendar.css";

  // Spectre.css style files
  import "../node_modules/spectre.css/dist/spectre-exp.css";
  import "../node_modules/spectre.css/dist/spectre-icons.css";
  import "../node_modules/spectre.css/dist/spectre.css";

  import Home from "./pages/Home";
  import Room from "./pages/Room";
  import Auth from "./pages/Auth";

  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";

  export let url = "";

  function home() {
    navigate("/");
  }
</script>

<style>
  .app {
    position: absolute;
    top: 0;
    height: 100%;
    color: white;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    justify-content: space-between;
    width: 100%;
  }

  .background {
    background-image: url("assets/background.jpg");
    filter: blur(5px) brightness(0.75);
    height: 100%;
    transform: scale(1.05);
    background-repeat: round;
    overflow: hidden;
  }

  .container {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    justify-content: space-between;
    height: 100%;
    position: relative;
    padding: 0;
  }
</style>

<div class="container">
<div class="background"></div>
  <div class="app">
    <Router {url}>
      <Header {home} />
      <Route path="/" component={Home} />
      <Route path="/:id" component={Room} />
      <Route path="/auth" component={Auth} />
    </Router>
    <Footer />
  </div>
</div>
