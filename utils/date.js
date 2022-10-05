export function dateFormatter(date) {
  return `${date.getFullYear()}- ${date.getMonth() + 1}-${date.getDate()}`;
}

export function getDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}