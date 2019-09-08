import { Calendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from "@fullcalendar/core/locales/fr";

export default class CalendarPlugin {

  constructor(calendarEl, onSelectFn) {
    this.calendar = new Calendar(calendarEl, {
      plugins: [timeGridPlugin, interactionPlugin],
      defaultView: 'timeGridWeek',
      header: false,
      slotDuration: "01:00:00",
      selectable: true,
      height: 700,
      scrollTime: "09:00:00",
      locale: frLocale,
      columnHeaderFormat: { weekday: "short" },
      allDaySlot: false,
      eventColor: 'midnightblue',
      slotLabelFormat: {
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: false,
        meridiem: 'short'
      },
      select: function (selectionInfo) {
        onSelectFn(selectionInfo.startStr, selectionInfo.endStr);
      },
    });

  }

  render() {
    this.calendar.render();
  }

  loadEvents(events) {
    this.calendar.removeAllEvents();
    events.map(e => this.calendar.addEvent({ start: e.startTime, end: e.endTime }));
  }

  focus(start, end) {
    this.calendar.select(start, end);
  }

}
