import moment from "moment/moment.js";

export default class DateService {
  private static dateRegex =
    /(0[1-9]|[1-2][0-9]|3[0-1]):(2[0-3]|[01][0-9]):[0-5][0-9]/;
  private static timerRegex = /(2[0-3]|[01][0-9]):[0-5][0-9]/;
  static getDateWithTimeString(time: string) {
    if (this.timerRegex.exec(time)) {
      const [hours, minutes] = time.split(":");
      return moment().add(+hours, "hours").add(minutes, "minutes").toDate();
    }

    throw new Error("Wrong date!");
  }

  static getDateByString(time: string): Date {
    if (this.dateRegex.exec(time)) {
      const [days, hours, minutes] = time.split(":");
      return moment()
        .set("days", +days)
        .set("hours", +hours)
        .set("minutes", +minutes)
        .toDate();
    }

    throw new Error("Wrong date!");
  }
}
