module.exports = {
  format_date: (date) => {
    return date.toLocaleTimeString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  },
};
