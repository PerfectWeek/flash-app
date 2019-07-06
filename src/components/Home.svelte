<script>
  import { Link } from "svelte-routing";

  let slotsFoundCount = 0;
  const timeAverage = 27;

  function increaseCount() {
    slotsFoundCount += 1;
  }
</script>

<style>
  .home {
    height: 100%;
  }

  .flex-component {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
  }

  .btn {
    background-color: black;
    color: white;
    cursor: pointer;
    font-size: 1.5em;
    padding: 2vh 2vw 2vh 2vw;
    margin-top: 2.5vh;
  }

  .home-content {
    justify-content: space-around;
    margin: 0 5vw 0 5vw;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .headline {
    font-size: 3em;
    line-height: 150%;
    margin: 0;
  }

  .right-part {
    font-size: 2rem;
  }

  .infos {
    list-style-type: none;
    line-height: 120%;
    padding: 0;
  }

  .question {
    margin: 0;
  }

</style>

<div class="home flex-component">
  <div class="home-content flex-component">
    <div class="left-part">
      <h2 class="headline">
        ORGANISEZ VOUS
        <br />
        GAGNEZ DU TEMPS
        <br />
        VIVEZ.
      </h2>
      <Link to="room">
        <button class="create-room btn" on:click={increaseCount}>
          TROUVER UN CRENEAU
        </button>
      </Link>
    </div>
    <div class="right-part">
    <h2 class="question">Flash <i>by PerfectWeek</i>, c'est quoi ?</h2>
      <ul class="infos">
        <li>Synchronisation automatique de l'agenda</li>
        <li>Une interface simple et efficace</li>
        <li>La revolution de la creation d'evenements</li>
        <li>L'expertise PerfectWeek</li>
      </ul>
    </div>
  </div>

</div>
