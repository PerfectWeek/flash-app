<script>
  import { navigate } from "svelte-routing";
  import * as RequestPlugin from "../plugins/Request.js";

  const timeAverage = 27;

  async function createRoom() {
    const res = await RequestPlugin.createRoom();

    if (res.status === 201) {
      navigate(`/${res.data.room.id}`);
    } else {
      console.error(res.statusText);
    }
  }
</script>

<style>
  .card {
    background-color: rgba(0, 0, 0, 0);
    border: none;
  }

  .headline {
    font-family: 'Montserrat', sans-serif;
    font-size: 2.7rem;
  }

  .round-button {
    border: solid 1px;
    background: rgba(0, 0, 0, 0);
    border-radius: 50px;
    transition: background-color 0.5s ease, color 0.5s ease, border 0.5s ease;
  }

  .round-button:hover {
    background-color: white;
    color: black !important;
  }

  .description {
    max-width: 900px;
    margin: auto;
    font-size: 1.2rem;
  }

  .create-room {
    width: 70%;
    max-width: 400px;
    font-size: 1.5rem;
    cursor: pointer;
    margin-top: 2vh;
  }
</style>

<div class="card text-center">
  <div class="card-header">
    <div class="card-title h1 headline">
      ORGANISEZ VOUS, GAGNEZ DU TEMPS, VIVEZ.
    </div>
  </div>
  <div class="card-body description text-center h5">
    En synchronisant vos calendriers personnels instantanément, Flash
    <i>by PerfectWeek</i>
    vous permet de trouver du temps libre pour vos activités en un rien de
    temps.
  </div>
  <div class="card-footer">
    <button class="round-button create-room text-light" on:click={createRoom}>
      Essayer maintenant
    </button>
  </div>
</div>
