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

  onMount(async () => {
    QRCodeImageSrc = await generateQRCode();
    const roomInfo = await getRoomInfo(id);
    accessToken = CookiePlugin.get(id);
    console.log(accessToken);
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
    console.log(accessToken);
    const res = await RequestPlugin.joinRoom(id, accessToken);
    console.log(res);
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

  function getRoomInfo(id) {
    return RequestPlugin.getRoomInfo(id);
  }
</script>

<style>

</style>

<div class="container">
  <div class="columns">
    <RoomInfo {QRCodeImageSrc} {roomMembers} />
    <TimeSlots {timeSlots} {googleAuth} {accessToken} />
  </div>
</div>
