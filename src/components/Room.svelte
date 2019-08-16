<script>
  import { onMount } from "svelte";

  import * as RequestPlugin from "../plugins/Request.js";
  import * as QRCodePlugin from "../plugins/QRCode.js";
  import * as CookiePlugin from "../plugins/Cookie.js";
  import RoomInfo from "./RoomInfo.svelte";
  import TimeSlots from "./TimeSlots.svelte";

  export let id;

  let QRCodeImageSrc = "";
  let roomMembers = [];
  let timeSlots = [];
  let accessToken;

  let startDate = new Date();
  let endDate = new Date();
  endDate.setDate(startDate.getDate() + 7);

  onMount(async () => {
    QRCodeImageSrc = await generateQRCode();
    const roomInfo = await getRoomInfo();
    accessToken = CookiePlugin.get(id);
    if (accessToken) {
      const res = await getFreeSlots();
      if (res.status === 200) {
        timeSlots = res.data.slots;
      }
    }
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

  async function joinRoom(accessToken) {
    const res = await RequestPlugin.joinRoom(id, accessToken);
    if (res.status === 200) {
      const slots_res = await getFreeSlots();
      if (slots_res.status === 200) {
        timeSlots = slots_res.data.slots;
      }
    }
  }

  function getAccessToken(win) {
    var timer = setInterval(() => {
      if (win.closed) {
        clearInterval(timer);
        accessToken = CookiePlugin.get("access_token");
        CookiePlugin.set(id, accessToken);
        CookiePlugin.remove("access_token");
        joinRoom(accessToken);
      }
    }, 1000);
  }

  async function googleAuth() {
    const res = await RequestPlugin.authenticate();
    const win = window.open(res.data, "Login with Google");
    getAccessToken(win);
  }

  function generateQRCode() {
    return QRCodePlugin.generate(window.location.href);
  }

  function getRoomInfo() {
    return RequestPlugin.getRoomInfo(id);
  }

  function getFreeSlots() {
    return RequestPlugin.getFreeSlots(id, accessToken, startDate, endDate);
  }
</script>

<style>
.calendar {
  border: none;
}
</style>

<div class="container">
  <div class="columns">

    <div class="card column col-mx-auto col-2 col-md-12 text-center text-dark">
      <RoomInfo {QRCodeImageSrc} {roomMembers} />
    </div>

    <div class="calendar column col-mx-auto col-10 col-md-12">
      {#if !accessToken}
        <button class="btn btn-lg centered" on:click={googleAuth}>
          Synchronisez votre calendrier Google
        </button>
      {:else}
        <TimeSlots
          {timeSlots}
          {googleAuth}
          {accessToken}
          {startDate}
          {endDate} />
      {/if}
    </div>
  </div>
</div>
