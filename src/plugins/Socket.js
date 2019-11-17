import io from "socket.io-client";

export default class Socket {
  constructor(id) {
    this.id = id;
    this.io = io("localhost:3000"); // TODO USE ENV VAR OR CONFIG FILE
  }

  join() {
    this.io.emit("join", this.id);
  }

  focusTimeslot(timeSlot) {
    this.io.emit(
      "focusTimeslot",
      this.id,
      timeSlot.startDate,
      timeSlot.endDate
    );
  }

  getIo() {
    return this.io;
  }
}
