import axios from 'axios';

export class RequestPlugin {
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://flash-api-by-pw.herokuapp.com/',
    });
  }

  getInstance() {
    return this.instance;
  }
}
