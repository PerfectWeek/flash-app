<script>

  import { fade } from "svelte/transition";

  import copy from "copy-to-clipboard";


  export let QRCodeImageSrc;

  let clipboardVisible = false;
  let message = "Copier le lien";

  function copyToClipboard() {
    copy(window.location.href);
    message = "Lien copié !";
  }

  function displayClipboard() {
    clipboardVisible = true;
  }

  function hideClipboard() {
    clipboardVisible = false;
    message = "Copier le lien";
  }
</script>

<style>
  .relative-pos {
    height: 15vw;
    min-height: 256px;
    position: relative;
  }

  .img-responsive {
    position: absolute;
  }

  #copy-clipboard {
    position: absolute;
    top: 50%; /* position the top  edge of the element at the middle of the parent */
    left: 50%; /* position the left edge of the element at the middle of the parent */

    transform: translate(-50%, -50%);
    z-index: 10;
    cursor: pointer;
  }
</style>

<div
  class="relative-pos"
  on:mouseenter={displayClipboard}
  on:mouseleave={hideClipboard}>

  {#if !clipboardVisible}
    <img
      transition:fade="{{duration: 150}}"
      src={QRCodeImageSrc}
      class="img-responsive"
      alt="QRCode" />
  {:else}
    <div transition:fade="{{duration: 150}}" id="copy-clipboard" on:click={copyToClipboard}>
      <i class="icon icon-4x icon-copy" />
      <div class="message">{message}</div>
    </div>
  {/if}
</div>
