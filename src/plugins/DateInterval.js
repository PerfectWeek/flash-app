export default class DateInterval {

  constructor() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.endDate.setDate(this.startDate.getDate() + 30);
  }
}
