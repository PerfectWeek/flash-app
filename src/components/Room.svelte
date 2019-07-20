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
  let accessToken = "";

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

  function waitForGoogleAuth(win) {
    var timer = setInterval(() => {
      if (win.closed) {
        clearInterval(timer);
        accessToken = CookiePlugin.get("access_token");
      }
    }, 1000);
  }

  async function googleAuth() {
    const res = await requestPlugin.post("/authenticate");
    const win = window.open(res.data, "Login with Google");
    waitForGoogleAuth(win);
  }

  function generateQRCode() {
    return QRCodePlugin.generate(window.location.href);
  }

  function fetchRoomInfo() {
    return requestPlugin.get(`rooms/${id}`);
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
