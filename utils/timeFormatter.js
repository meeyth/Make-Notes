import moment from "moment";

export const timeFormatter = (date) => moment(date).fromNow();

export const calendarForm = (date) => {
    const time = moment(date).calendar().split(" ");
    if (time[0] === "Last") return time[0] + " " + time[1];
    return time[0];
};