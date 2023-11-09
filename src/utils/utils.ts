import moment from "moment";

// Get formatted date
export const formatDate = (date: any, format: string) => {
  return moment(date).format(format);
};

// Check pblog date is between current date and within last 30 days
export const checkDateBetween = (
  fromDate: string,
  toDate: string,
  date: string
) => {
  var d1 = fromDate.split("/");
  var d2 = toDate.split("/");
  var c = date.split("/");

  var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11
  var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
  var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

  return check > from && check < to;
};
