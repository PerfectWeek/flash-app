<script>
  import { onMount } from "svelte";

  import Popper from "popper.js";

  import CalendarPlugin from "../../plugins/Calendar.js";
  import * as RequestPlugin from "../../plugins/Request.js";
  import DateInterval from "../../plugins/DateInterval.js";

  import CreateEventPopper from "./CreateEventPopper.svelte";

  const focusedDateInterval = new DateInterval();

  export let id;
  export let isLogged;
  export let io;

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

    var popperInstance = new Popper(focusedElement, popper, {
      placement: "right"
    });
  }

  function onSelect(start, end) {
    focusedDateInterval.startDate = start;
    focusedDateInterval.endDate = end;

    io.focusTimeslot(focusedDateInterval);
    displayEventPopper();
  }

  function createEvent() {}
</script>

<style>
  #calendar {
    width: 100%;
    height: 100%;
    background-color: white;
    color: black;
  }
</style>

<div id="calendar" />

<CreateEventPopper {focusedDateInterval} {createEvent} />
