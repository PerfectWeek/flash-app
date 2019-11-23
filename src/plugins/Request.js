import axios from "axios";
import qs from "querystring";

import * as CookiePlugin from "./Cookie";

const instance = axios.create({
  // baseURL: "https://api.flash.perfect-week.pw"
  baseURL: "https://flash-api-by-pw.herokuapp.com"
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

export function setRoomTitle(id, title) {
  return instance.put(`/rooms/${id}/title`, qs.stringify({ title: title }), {
    headers: {
      authorization: `Bearer ${CookiePlugin.get(id)}`
    }
  });
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

export function getUserInfo(id) {
  return instance.get("/me", {
    headers: {
      authorization: `Bearer ${CookiePlugin.get(id)}`
    }
  });
}
