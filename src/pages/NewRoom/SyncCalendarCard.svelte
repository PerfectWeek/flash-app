<script>
  import GoogleSignIn from "../../components/GoogleSignIn.svelte";

  export let hasSynced = false;

  export let id;
</script>

<style>
  .centered {
    margin: 20px;
    text-align: center;
  }

  .blurred-bg {
    background: rgba(0, 0, 0, 0.7)
  }
</style>

<div class="modal modal-sm active blurred-bg" id="modal-id">
  <div class="modal-container">
    <div class="modal-header">
      <div class="modal-title h5">
        Connectez vous pour synchroniser votre calendrier
      </div>
    </div>
    <div class="modal-body">
      <div class="content">

        <div class="centered">
          <GoogleSignIn {id} bind:synced={hasSynced} />
        </div>
      </div>
    </div>
  </div>
</div>
