function getISODate(date) {
  return new Date(Date.parse(date)).toISOString();
}

function ISODateTo(dateStr, format) {
  const options = {
    datetime: {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    },
    date: {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  };

  const date = new Date(dateStr);
  if (format === "datetime" || format === "date") {
    return date.toLocaleDateString("ru-RU", options[format]);
  }
  if (format === "time") {
    const hh = date.getHours().toString().padStart(2, 0);
    const mm = date.getHours().toString().padStart(2, 0);
    return `${hh}:${mm}`;
  }
}

export { ISODateTo, getISODate };
