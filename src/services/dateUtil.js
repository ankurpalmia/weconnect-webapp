export function dateFormat(date_time) {
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    let utcDate = new Date(date_time);
    let offset = utcDate.getTimezoneOffset();
    let date = new Date(utcDate.getTime());

    let datetime =
        date.getDate() +
        " " +
        months[date.getMonth()] +
        " " +
        date.getUTCFullYear();
    if (date.getMinutes() > 9)
        datetime = datetime + " at " + date.getHours() + ":" + date.getMinutes();
    else
        datetime = datetime + " at " + date.getHours() + ":0" + date.getMinutes();
    return datetime;
}
