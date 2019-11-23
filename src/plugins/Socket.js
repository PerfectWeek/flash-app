import io from "socket.io-client";

export default class Socket {

  constructor(id) {
    this.timestamp = null;
    this.id = id;
    // this.io = io("https://api.flash.perfect-week.pw");
    this.io = io("https://flash-api-by-pw.herokuapp.com");
  }

  join() {
    this.io.emit("join", this.id);
  }

  focusTimeslot(timeSlot) {
    const time = new Date();
    if (!this.timestamp || time - this.timestamp > 100) { // More than one second after previous request
      this.timestamp = time;
      this.io.emit(
        "focusTimeslot",
        this.id,
        timeSlot.startDate,
        timeSlot.endDate
        );
      }
  }

  setRoomTitle(title) {
    this.io.emit("setRoomTitle", this.id, title);
  }

  getIo() {
    return this.io;
  }
}
