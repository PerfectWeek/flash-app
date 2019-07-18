import axios from 'axios';

export function getInstance() {
  return axios.create({
    // baseURL: 'https://flash-api-by-pw.herokuapp.com/',
    baseURL: 'http://localhost:3000/',
  });
}
