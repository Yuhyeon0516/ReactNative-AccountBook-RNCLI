export function convertToDateString(time: number): string {
  const date = new Date(time);

  function addZeroIfOneCharecter(number: number): string {
    if (number < 10) {
      return `0${number}`;
    }
    return number.toString();
  }

  return `${date.getFullYear()}-${addZeroIfOneCharecter(
    date.getMonth() + 1,
  )}-${addZeroIfOneCharecter(date.getDate())} ${addZeroIfOneCharecter(
    date.getHours(),
  )}:${addZeroIfOneCharecter(date.getMinutes())}`;
}
