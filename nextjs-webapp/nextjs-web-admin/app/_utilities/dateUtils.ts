export function convertToServiceDateString(date: Date) {
  let dd = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate();
  let MM =
    date.getUTCMonth() + 1 < 10
      ? `0${date.getUTCMonth() + 1}`
      : `${date.getUTCMonth() + 1}`;
  let yyyy = date.getUTCFullYear();
  let HH = date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours();
  let mm =
    date.getUTCMinutes() < 10
      ? `0${date.getUTCMinutes()}`
      : date.getUTCMinutes();
  let ss =
    date.getUTCSeconds() < 10
      ? `0${date.getUTCSeconds()}`
      : date.getUTCSeconds();
  let fff =
    date.getUTCMilliseconds() < 10
      ? `00${date.getUTCMilliseconds()}`
      : date.getUTCMilliseconds() < 100
      ? `0${date.getUTCMilliseconds()}`
      : date.getUTCMilliseconds();
  let z = `+00:00`;
  return `${yyyy}-${MM}-${dd}T${HH}:${mm}:${ss}.${fff}${z}`;
}
