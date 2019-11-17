<script>
  import SyncCalendarCard from "./SyncCalendarCard.svelte";
  import Calendar from "./Calendar.svelte";
  import ShareRoom from "./ShareRoom.svelte";

  export let id;
  export let isLogged = undefined;

  import Socket from "../../plugins/Socket.js";

  let io = new Socket(id, (a) => {console.log(a)});

  $: {
    if (isLogged === true) {
      io.join();
    }
  }

</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 0;
  }

  .columns {
    height: 100%;
  }
</style>

<div class="container">
  {#if isLogged !== true}
    <SyncCalendarCard {id} bind:hasSynced={isLogged} />
  {/if}
  <div class="columns col-gapless">
    <div class="column col-2 col-md-12">
      <ShareRoom {id} {isLogged} {io}/>
    </div>
    <div class="column col-10 col-md-12">
      <Calendar {id} {isLogged} {io}/>
    </div>
  </div>
</div>
