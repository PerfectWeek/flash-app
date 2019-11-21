import io from "socket.io-client";

export default class Socket {
  constructor(id) {
    this.id = id;
    this.io = io(process.env.API_URL); // TODO USE ENV VAR OR CONFIG FILE
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

  setRoomTitle(title) {
    this.io.emit("setRoomTitle", this.id, title);
  }

  getIo() {
    return this.io;
  }
}
