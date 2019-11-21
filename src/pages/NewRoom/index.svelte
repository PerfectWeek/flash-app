<script>
  import { onMount, setContext } from 'svelte';

  import * as RequestPlugin from "../../plugins/Request.js";
  import * as CookiePlugin from "../../plugins/Cookie.js";
  import Socket from "../../plugins/Socket.js";

  import SyncCalendarCard from "./SyncCalendarCard.svelte";
  import Calendar from "./Calendar.svelte";
  import ShareRoom from "./ShareRoom.svelte";

  export let id;
  export let isLogged = undefined;


  let io = new Socket(id);

  $: {
    if (isLogged === true) {
      io.join();
    }
  }

  let googleAuth = async () => {
    const res = await RequestPlugin.authenticate();
    const win = window.open(res.data, "Login with Google");
    var timer = setInterval(async () => {
      if (win.closed) {
        clearInterval(timer);
        const access_token = CookiePlugin.get("access_token");
        CookiePlugin.set(id, access_token);
        CookiePlugin.remove("access_token");
        await RequestPlugin.joinRoom(id);
        isLogged = true;
      }
    }, 1000);
  }

  onMount(() => {
    setContext('googleAuth', googleAuth);
  });

  let title = 'Title';
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 0;
    background-color: white;
    color: black;
  }

  .columns {
    height: 100%;
  }

  .main-view {
    overflow-y: hidden;
    height: 100%;
  }

  .calendar {
    height: 94%;
  }
</style>

<div class="container">
  {#if isLogged !== true}
    <SyncCalendarCard {id} bind:hasSynced={isLogged} />
  {/if}
  <div class="columns col-gapless">
    <div class="column col-2 col-md-12">
      <ShareRoom {id} {isLogged} {io} />
    </div>
    <div class="column col-10 col-md-12 main-view">
      <div class="calendar">
        <Calendar {id} {isLogged} {io} {title} />
      </div>
    </div>
  </div>
</div>
