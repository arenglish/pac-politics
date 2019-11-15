export function isObjectEmpty(obj) {
  if (obj === null) {
    return true;
  }
  const res = Object.entries(obj).length === 0 && typeof obj === "object";
  return res;
}
