<script>
  export let focusedDateInterval;
  export let createEvent;
</script>

<style>
  .card {
    color: black;
  }
</style>

<div class="card popper" style="display: none;">
  <div class="card-header">
    <div class="card-title h5">Récapitulatif</div>
  </div>
  <div class="card-body">
    Début: {focusedDateInterval.startDate.toLocaleString('fr-FR', { timeZone: 'UTC' })}
    <br />
    Fin: {focusedDateInterval.endDate.toLocaleString('fr-FR', { timeZone: 'UTC' })}
  </div>
  <div class="card-footer">
    <button class="btn btn-primary" on:click={createEvent}>
      Créer l'événement
    </button>
  </div>
</div>
