import { Observable } from "rxjs";

export function safeGet(data, path) {
  if (!path) return undefined;
  const paths = path.split(".");
  let res = data;
  while (paths.length) {
    res = res[paths.shift()];
    if (!res) return undefined;
  }
  return res;
}

enum HTTP_METHODS {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE"
}

export type Headers = { [index: string]: string };
type HttpMethods = keyof typeof HTTP_METHODS;

export function observableHttpRequest<T>(
  method: HttpMethods,
  url: string,
  headers: Headers = {},
  body: any = null
): Observable<T> {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);

  Object.keys(headers).forEach(key => {
    xhr.setRequestHeader(key, headers[key]);
  });

  return Observable.create(observer => {
    xhr.send(body);

    xhr.onload = function() {
      const res = JSON.parse(xhr.response);
      observer.next(res);
      observer.complete();
    };

    xhr.onerror = function() {
      observer.error(xhr);
    };
  });
}

export const http = {
  get: <T>(url: string, headers?: Headers) =>
    observableHttpRequest<T>(HTTP_METHODS.GET, url, headers),
  put: <T>(url: string, headers?: Headers, body?: any) =>
    observableHttpRequest<T>(HTTP_METHODS.PUT, url, headers, body),
  post: <T>(url: string, headers?: Headers, body?: any) =>
    observableHttpRequest<T>(HTTP_METHODS.POST, url, headers, body),
  delete: <T>(url: string, headers?: Headers) =>
    observableHttpRequest<T>(HTTP_METHODS.DELETE, url, headers)
};
