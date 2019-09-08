<script>
  export let QRCodeImageSrc = "";
  export let roomMembers = [];
</script>

<style>
  .members-list {
    max-height: 200px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .members-list::-webkit-scrollbar {
    display: none;
  }

  .img-responsive {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .label {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background-color: mediumblue;
    color: white;
  }
</style>

<div class="card-header">
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
</div>
<div class="card-body">
  <div class="card-title h2 text-left">Membres</div>
  <div class="members-list">
    {#each roomMembers as member}
      <span class="label">{member.email}</span>
    {/each}
  </div>
</div>
