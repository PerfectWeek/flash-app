<script>
  import { onMount } from "svelte";

  import * as RequestPlugin from "../../plugins/Request.js";

  onMount(() => {
    document.getElementById("title").addEventListener("keypress", evt => {
      if (evt.which === 13) {
        evt.preventDefault();
        document.activeElement.blur();
        io.setRoomTitle(title);
        RequestPlugin.setRoomTitle(id, title);
      }
    });

    io.getIo().on("roomTitleChanged", newTitle => (title = newTitle));
  });

  async function getRoomTitle() {
    const res = await RequestPlugin.getRoomInfo(id);
    if (res.status === 200) {
      title = res.data.room.title;
    }
  }

  export let id;
  export let isLogged;
  export let io;
  export let title = "";

  $: {
    if (isLogged === true) {
      getRoomTitle();
    }
  }
</script>

<style>
  #title:focus {
    outline: 0px solid transparent;
  }
</style>

<header class="navbar">
  <section class="navbar-section">
    <h2 id="title" contenteditable="true" bind:textContent={title}>{title}</h2>
  </section>
</header>
