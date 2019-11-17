<script>
  import { onMount } from "svelte";

  import * as RequestPlugin from "../../plugins/Request.js";

  import QRCode from "../../components/QRCode.svelte";
  import Title from "../../components/Title.svelte";
  import Footer from "../../components/Footer.svelte";

  import MembersList from "./MembersList.svelte";

  import { generate } from "../../plugins/QRCode.js";

  let QRCodeImageSrc = "";

  export let id;
  export let isLogged;
  export let io;

  io.getIo().on("newUser", () => {
    console.log("User has joined");
    updateRoomInfo();
  });

  let members = [];

  $: {
    if (isLogged !== undefined) {
      updateRoomInfo();
    }
  }

  onMount(async () => {
    QRCodeImageSrc = await generate(window.location.href);
  });

  async function updateRoomInfo() {
    const res = await RequestPlugin.getRoomInfo(id);
    if (res.status === 200) {
      members = res.data.room.members;
    }
  }
</script>

<style>
  .accordion-header {
    cursor: pointer;
    font-family: "Google Sans", Roboto, Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.25px;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }

  .side-header {
    padding: 0.5rem;
    text-align: center;
  }

  .accordion-body {
    margin-left: 1vw;
  }

  .sidebar {
    height: 100%;
    border: none;
    /* background: rgba(0, 0, 0, 0.5); */
    background-color: white;
    color: black;
    top: 0;
    padding: 0 5px;
  }

  .footer {
    position: fixed;
    bottom: 0;
  }
</style>

<div class="sidebar">
  <div class="side-header">
    <Title clickable="true" />
  </div>
  <details class="accordion members-content" open>
    <summary class="accordion-header h5">
      <i class="icon icon-arrow-right mr-1" />
      Partage
    </summary>
    <div class="accordion-body">
      <QRCode {QRCodeImageSrc} />
    </div>
  </details>
  <details class="accordion members-content" open>
    <summary class="accordion-header h5">
      <i class="icon icon-arrow-right mr-1" />
      Membres du salon
    </summary>
    <div class="accordion-body">
      <MembersList {members} />
    </div>
  </details>
  <div class="footer">
    <Footer />
  </div>
</div>
