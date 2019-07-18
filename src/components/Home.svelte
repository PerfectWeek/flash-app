<script>
  import { navigate } from "svelte-routing";
  import * as RequestPlugin from "../plugins/Request.js";

  let slotsFoundCount = 0;
  const timeAverage = 27;

  const requestPlugin = RequestPlugin.getInstance();

  async function createRoom() {
    const res = await requestPlugin.post("/rooms");

    if (res.status === 201) {
      navigate(`/${res.data.room.id}`);
    } else {
      alert("An error occured, try again later");
    }
  }
</script>

<style>
  .create-room {
    margin-top: 1rem;
    background-color: black;
    border-color: black;
  }

  .create-room:hover {
    color: black;
  }
  .hero {
    padding-top: 0;
    padding-bottom: 2rem;
  }

</style>

<div class="container">
  <div class="columns main-content">
    <div class="column col-4 col-md-12 col-xs-12 col-mx-auto text-secondary">
      <h1 class="hero">
        ORGANISEZ VOUS
        <br />
        GAGNEZ DU TEMPS
        <br />
        VIVEZ.
        <button class="btn btn-lg text-light create-room" on:click={createRoom}>
          TROUVER UN CRENEAU
        </button>
      </h1>
    </div>
    <div class="column col-6 col-md-12 col-xs-12 text-dark text-large">
      <div class="text-left">
        <h2 class="question">
          Flash
          <i>by PerfectWeek,</i>
          c'est quoi ?
        </h2>
        <ul class="infos">
          <li>Synchronisation automatique de l'agenda</li>
          <li>Une interface simple et efficace</li>
          <li>La revolution de la creation d'evenements</li>
          <li>L'expertise PerfectWeek</li>
        </ul>
      </div>
    </div>
  </div>
</div>
