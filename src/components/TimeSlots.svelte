<script>
  export let timeSlots;
  export let accessToken;
  export let googleAuth;
</script>

<style>
  .card {
    margin-top: 1rem;
    background: rgba(0, 0, 0, 0.3);
    border: none;
  }
</style>

<div class="card column col-9 col-md-12 col-mx-auto">
  {#if !accessToken}
    <button class="btn" on:click={googleAuth}>Google</button>
  {/if}
</div>
