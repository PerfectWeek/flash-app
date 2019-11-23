<script>
  import { onMount } from "svelte";

  import Popper from "popper.js";

  import CalendarPlugin from "../../plugins/Calendar.js";
  import * as RequestPlugin from "../../plugins/Request.js";
  import DateInterval from "../../plugins/DateInterval.js";
  import { getEventCreationUrl } from "../../plugins/CreateGoogleEvent.js";

  import CreateEventPopper from "./CreateEventPopper.svelte";
  import TopBar from "./TopBar.svelte";

  const focusedDateInterval = new DateInterval();

  export let id;
  export let isLogged;
  export let io;

  let popperInstance;

  let calendar;

  io.getIo().on("focusTimeslot", focus);

  function focus(timeslot) {
    if (
      focusedDateInterval.startDate.toISOString() !== timeslot.start ||
      focusedDateInterval.endDate.toISOString() !== timeslot.end
    ) {
      calendar.focus(timeslot.start, timeslot.end);
    }
  }

  onMount(() => {
    const calendarEl = document.getElementById("calendar");

    calendar = new CalendarPlugin(calendarEl, onSelect);
    calendar.render();
  });

  $: if (isLogged === true) {
    populateCalendar();
  }

  async function populateCalendar() {
    const res = await RequestPlugin.getEvents(id, focusedDateInterval);
    if (res.status === 200) {
      calendar.loadEvents(res.data.slots);
    }
  }

  function displayEventPopper() {
    const focusedElement = document.querySelector(".fc-highlight");
    const popper = document.querySelector(".popper");

    popper.style.display = "block";
    popper.style.zIndex = 10;

    popperInstance = new Popper(focusedElement, popper, {
      placement: "right"
    });
  }

  function onSelect(start, end) {
    focusedDateInterval.startDate = start;
    focusedDateInterval.endDate = end;

    io.focusTimeslot(focusedDateInterval);
    displayEventPopper();
  }

  function createEvent() {
    window.open(
      getEventCreationUrl(
        focusedDateInterval.startDate,
        focusedDateInterval.endDate
      )
    );
  }

  function prev() {
    if (popperInstance) {
      popperInstance.destroy();
    }
    calendar.prev();
  }

  function next() {
    if (popperInstance) {
      popperInstance.destroy();
    }
    calendar.next();
  }
</script>

<style>
  .top-bar {
    height: 6%;
  }

  #calendar {
    width: 100%;
    height: 100%;
    background-color: white;
    color: black;
  }
</style>

<div class="top-bar">
  <TopBar {id} {isLogged} {io} {prev} {next} />
</div>
<div id="calendar" />

<CreateEventPopper {focusedDateInterval} {createEvent} />
