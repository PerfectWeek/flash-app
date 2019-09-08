<script>
  import { onMount } from "svelte";
  import Popper from "popper.js";

  import CreateEventPopper from "./CreateEventPopper.svelte";
  import CalendarPlugin from "../plugins/Calendar.js";
  import DateInterval from "../plugins/DateInterval.js";

  export let timeSlots;
  export let accessToken;
  export let googleAuth;
  export let socket;
  export let roomId;

  let startTime;
  let endTime;

  let focusedDateInterval = new DateInterval();
  let calendar;

  $: load(timeSlots);

  onMount(async () => {
    var calendarEl = document.getElementById("calendar");

    calendar = new CalendarPlugin(calendarEl, focusTimeslot);
    calendar.render();
  });

  $: {
    if (socket) {
      socket.on("timeslotFocus", dateRange => {
        calendar.focus(dateRange.start, dateRange.end);
      });
    }
  }

  function load(slots) {
    if (slots.length > 0) {
      calendar.loadEvents(slots);
    }
  }

  function displayPopper(start, end) {
    const focusedElement = document.querySelector(".fc-highlight");
    const popper = document.querySelector(".popper");

    focusedDateInterval.startDate.setDate(start);
    focusedDateInterval.endDate.setDate(end);

    popper.style.display = "block";
    popper.style.zIndex = 100;

    var popperInstance = new Popper(focusedElement, popper, {
      placement: "right"
    });
  }

  function emitFocusTimeslot(start, end) {
    socket.emit("focusTimeslot", { start, end });
  }

  function focusTimeslot(start, end) {
    if (start !== startTime && end !== endTime) {
      startTime = start;
      endTime = end;
      emitFocusTimeslot(start, end);
      displayPopper(start, end);
    }
  }
</script>

<style>

</style>

<div id="calendar" />
<CreateEventPopper {focusedDateInterval} />
