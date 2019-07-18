<script>
  import { onMount } from "svelte";

  import * as RequestPlugin from "../plugins/Request.js";
  import * as QRCodePlugin from "../plugins/QRCode.js";
  import RoomInfo from "./RoomInfo.svelte";
  import TimeSlots from "./TimeSlots.svelte";

  export let id;

  const requestPlugin = RequestPlugin.getInstance();

  onMount(async () => {
    QRCodeImageSrc = await generateQRCode();
    const roomInfo = await fetchRoomInfo();
    //roomMembers = roomInfo.data.room.members;
    roomMembers = [
      "matthias.alif@gmail.com",
      "tim92i@gmail.com",
      "matthias.alif@epitech.eu",
      "matthias.alif@gmail.com",
      "tim92i@gmail.com",
      "matthias.alif@epitech.eu",
      "matthias.alif@gmail.com",
      "tim92i@gmail.com",
      "matthias.alif@epitech.eu",
      "matthias.alif@gmail.com",
      "tim92i@gmail.com",
      "matthias.alif@epitech.eu",
      "matthias.alif@gmail.com",
      "tim92i@gmail.com",
      "matthias.alif@epitech.eu"
    ];
  });

  function generateQRCode() {
    return QRCodePlugin.generate(window.location.href);
  }

  function fetchRoomInfo() {
    return requestPlugin.get(`rooms/${id}`);
  }

  async function googleAuth() {
    const res = await requestPlugin.getInstance().post('/authenticate');
    console.log(res);
  }
</script>

<style>
  .card {
    margin-top: 1rem;
    background: rgba(0, 0, 0, 0.3);
    border: none;
  }

  .members-list {
    max-height: 200px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .img-responsive {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .label {
    margin-top: 0.5rem;
  }
</style>

<div class="container">
  <div class="columns">
    <div
      class="card column col-3 col-md-10 col-xs-11 col-mx-auto text-center
      text-light">
      <div class="card-title h2 text-left">Partager le salon</div>
      <div class="columns">
        <div class="column col-mx-auto card-image">
          <img
            src={QRCodeImageSrc}
            alt="qrcode-partage"
            class="img-responsive column col-mx-auto" />
        </div>
      </div>
      <div class="text-large text-bold">OU</div>
      <div class="card text-ellipsis">{window.location.href}</div>

      <div class="card-title h2 text-left">Membres</div>
      <div class="members-list">
        {#each roomMembers as member}
          <span class="label label">{member}</span>
        {/each}
      </div>
    </div>

    <div class="card column col-8 col-md-12 col-mx-auto">
      <button class="btn" on:click={googleAuth}>Google</button>
    </div>
  </div>
</div>
