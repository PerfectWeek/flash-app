import axios from 'axios';

const instance = axios.create({
  //baseURL: 'https://flash-api-by-pw.herokuapp.com/',
  baseURL: 'http://localhost:3000/',
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

//
// Auth related requests
//
export function authenticate() {
  return instance.post("/authenticate");
}

export function sendCode(code) {
  return instance.get(`/authenticate?code=${code}`);
}
