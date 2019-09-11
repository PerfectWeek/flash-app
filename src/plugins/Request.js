import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.flash.perfect-week.pw/',
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

export function joinRoom(id, accessToken) {
  return instance.put(
    `/rooms/${id}`,
    {},
    {
      headers: {
        authorization: `Bearer ${accessToken}`
      }
    }
  );
}

export function getFreeSlots(id, accessToken, dateInterval) {
  return instance.get(
    `/rooms/${id}/slots?start_date=${dateInterval.startDate.toISOString()}&end_date=${dateInterval.endDate.toISOString()}`,
    {
      headers: {
        authorization: `Bearer ${accessToken}`
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
