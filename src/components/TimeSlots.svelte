<script>
  import { onMount } from "svelte";

  import CalendarPlugin from "../plugins/Calendar.js";
  import * as CreateGoogleEventPlugin from "../plugins/CreateGoogleEvent.js";

  export let timeSlots;
  export let accessToken;
  export let googleAuth;
  export let startDate;
  export let endDate;

  let calendar;

  $: load(timeSlots);

  onMount(async () => {
    var calendarEl = document.getElementById("calendar");

    const displayCreateEventModal = (start, end) => {
      const win = window.open(CreateGoogleEventPlugin.getEventCreationUrl(start, end), "Add the event to your calendar");
    };

    calendar = new CalendarPlugin(calendarEl, displayCreateEventModal);
    calendar.render();
  });

  function load(slots) {
    if (slots.length > 0) {
      calendar.loadEvents(slots);
    }
  }
</script>

<style>

</style>

<div id="calendar" />
