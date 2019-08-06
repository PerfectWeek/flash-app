<script>
  import { navigate } from "svelte-routing";
  import * as RequestPlugin from "../plugins/Request.js";

  let slotsFoundCount = 0;
  const timeAverage = 27;

  async function createRoom() {
    const res = await RequestPlugin.createRoom();

    if (res.status === 201) {
      navigate(`/${res.data.room.id}`);
    } else {
      alert("An error occured, try again later");
    }
  }
</script>

<style>
  .card {
    background-color: rgba(0, 0, 0, 0);
    border: none;
  }

  .headline {
    font-family: "Circular";
    font-weight: 700;
    letter-spacing: -0.04em;
    font-size: 2.7rem;
    color: midnightblue;
  }

  .description {
    max-width: 700px;
    margin: auto;
    color: midnightblue;
  }

  .create-room {
    background-color: midnightblue;
    border-radius: 40px;
    width: 70%;
    max-width: 400px;
    font-size: 1.5rem;
    cursor: pointer;
    margin-top: 2vh;
  }

</style>

<div class="card text-center text-light">
  <div class="card-header">
    <div class="card-title h1 headline">
      ORGANISEZ VOUS, GAGNEZ DU TEMPS, VIVEZ.
    </div>
  </div>
  <div class="card-body description text-center h5">
    En synchronisant vos calendriers personnels instantanement, Flash
    <i>by PerfectWeek</i>
    vous permet de trouver du temps libre pour vos activites en un rien de
    temps. Notre interface a ete etudiee pour vous offrir la meilleure
    experience possible grace au savoir faire de PerfectWeek.
  </div>
  <div class="card-footer">
    <button class="create-room text-light" on:click={createRoom}>
      Essayez maintenant
    </button>
  </div>
</div>
