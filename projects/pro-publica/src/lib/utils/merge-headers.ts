import { HttpHeaders } from "@angular/common/http";

export function mergeHeaders(headers1, headers2) {
  if (!headers1 || !headers2) {
    throw new Error("Invalid arguments for headers!");
  }

  const newHeaders = new HttpHeaders();
  headers1.keys().forEach(key => {
    newHeaders.append(key, headers1.get(key));
  });
  headers2.keys().forEach(key => {
    newHeaders.append(key, headers2.get(key));
  });

  return newHeaders;
}
