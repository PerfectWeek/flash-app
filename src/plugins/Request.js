import axios from "axios";

import * as CookiePlugin from "./Cookie";

const instance = axios.create({
  baseURL: "http://localhost:3000"
});

//
// Rooms related requests
//
export function createRoom() {
  return instance.post("/rooms");
}

export function getRoomInfo(id) {
  return instance.get(`/rooms/${id}`);
}

export function joinRoom(id) {
  return instance.put(
    `/rooms/${id}`,
    {},
    {
      headers: {
        authorization: `Bearer ${CookiePlugin.get(id)}`
      }
    }
  );
}

export function getEvents(id, dateInterval) {
  return instance.get(
    `/rooms/${id}/slots?start_date=${dateInterval.startDate.toISOString()}&end_date=${dateInterval.endDate.toISOString()}`,
    {
      headers: {
        authorization: `Bearer ${CookiePlugin.get(id)}`
      }
    }
  );
}

//
// Auth related requests
//
export function authenticate() {
  return instance.post("/authenticate");
}

export function sendCode(code) {
  return instance.get(`/authenticate?code=${code}`);
}
