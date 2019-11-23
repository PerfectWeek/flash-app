<script>
  import { navigate } from "svelte-routing";
  import * as RequestPlugin from "../../plugins/Request.js";

  import Header from "../../components/Header.svelte";
  import Footer from "../../components/Footer.svelte";

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
    font-family: "Montserrat", sans-serif;
    font-size: 2.7rem;
  }

  .round-button {
    border: none;
    display: inline-block;
    border-radius: 99px;
    color: white;
    position: relative;
    z-index: 1;
    padding: 17px 35px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .round-button:before,
  .round-button:after {
    content: " ";
    position: absolute;
    border-radius: 99px;
  }

  .round-button:before {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -2;
    background: #503b9a;
    background: -moz-linear-gradient(left, #503b9a 0%, #269cc1 100%);
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(0%, #503b9a),
      color-stop(100%, #269cc1)
    );
    background: -webkit-linear-gradient(left, #503b9a 0%, #269cc1 100%);
    background: -o-linear-gradient(left, #503b9a 0%, #269cc1 100%);
    background: -ms-linear-gradient(left, #503b9a 0%, #269cc1 100%);
    background: linear-gradient(to right, #503b9a 0%, #269cc1 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#503b9a', endColorstr='#269cc1',GradientType=1 );
  }

  .round-button:after {
    top: 2px;
    bottom: 2px;
    left: 2px;
    right: 2px;
    background-color: black;
    z-index: -1;
    opacity: 1;
    transition: all 0.6s ease-in-out;
  }

  .round-button:hover:after {
    opacity: 0;
  }

  .description {
    max-width: 900px;
    margin: auto;
    font-size: 1.2rem;
  }

  .create-room {
    width: 70%;
    max-width: 400px;
    font-size: 1.2rem;
    cursor: pointer;
    margin-top: 2vh;
  }
</style>

<Header />
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
<Footer />
