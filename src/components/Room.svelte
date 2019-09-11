<script>
  import { onMount } from "svelte";
  import io from "socket.io-client";

  import * as RequestPlugin from "../plugins/Request.js";
  import * as QRCodePlugin from "../plugins/QRCode.js";
  import * as CookiePlugin from "../plugins/Cookie.js";
  import DateInterval from "../plugins/DateInterval.js";
  import RoomInfo from "./RoomInfo.svelte";
  import TimeSlots from "./TimeSlots.svelte";

  export let id;

  let QRCodeImageSrc = "";
  let roomMembers = [];
  let timeSlots = [];
  let accessToken;
  let socket;

  const dateInterval = new DateInterval();

  onMount(async () => {
    QRCodeImageSrc = await generateQRCode();
    roomMembers = await getRoomMembers();
    accessToken = CookiePlugin.get(id);
    if (accessToken) {
      const res = await getFreeSlots();
      if (res.status === 200) {
        timeSlots = res.data.slots;
      }
    }
    if (accessToken) {
      joinRoomSocket();
    }
  });

  async function joinRoom(accessToken) {
    const res = await RequestPlugin.joinRoom(id, accessToken);
    if (res.status === 200) {
      joinRoomSocket();
    }
  }

  function joinRoomSocket() {
    socket = io(`${process.env.API_HOST}`);

    socket.emit("join", id);

    socket.on("newUser", async () => {
      roomMembers = await getRoomMembers();
      const slotsRes = await getFreeSlots();
      if (slotsRes.status === 200) {
        timeSlots = slotsRes.data.slots;
      }
    });
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

  async function getRoomMembers() {
    const res = await RequestPlugin.getRoomInfo(id);
    if (res.status === 200) {
      return res.data.room.members;
    }
    return null;
  }

  function getFreeSlots() {
    return RequestPlugin.getFreeSlots(id, accessToken, dateInterval);
  }
</script>

<style>
  .calendar {
    border: none;
  }

  .full-height {
    min-height: 90%;
  }

  .light-grey {
    background-color: #f7f7f7;
  }
</style>

<div class="container full-height">
  <div class="columns full-height">

    <div
      class="card column light-grey col-mx-auto col-2 col-md-12 text-center
      text-dark">
      <RoomInfo {QRCodeImageSrc} {roomMembers} />
    </div>

    <div class="calendar column col-mx-auto col-10 col-md-12">
      {#if !accessToken}
        <button class="btn btn-lg centered" on:click={googleAuth}>
          Synchronisez votre calendrier Google
        </button>
      {:else}
        <TimeSlots {timeSlots} {googleAuth} {accessToken} {socket} />
      {/if}
    </div>
  </div>
</div>
