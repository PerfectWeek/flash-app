export default class DateInterval {

  constructor() {
    this.startDate = new Date();
    this.startDate.setDate(this.startDate.getDate() - (this.startDate.getDay() === 0 ? 6 : this.startDate.getDay())); // TODO : change this ugly thing
    this.endDate = new Date();
    this.endDate.setDate(this.startDate.getDate() + 6);
  }
}
