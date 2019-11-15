import {
  ApiEndpoint,
  ApiEndpointOptions,
  StringIndexable
} from "./endpoint.model";
import { Headers, http, safeGet } from "./safe-get";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export class Resource {
  id?: number | string;
}

export class Serializer {
  fromPlain: <T>(plain: any) => T;

  fromPlainArray: <T>(plain: any) => T[];

  toJson: <T>(resource: T | T[]) => string;

  constructor(
    fromPlain = <T>(plain: any) => plain as T,
    fromPlainArray = <T>(plain: any[]) => plain as T[],
    toJson = <T>(resource: T | T[]) => JSON.stringify(resource)
  ) {
    this.fromPlain = fromPlain;
    this.fromPlainArray = fromPlainArray;
    this.toJson = toJson;
  }
}

type ApiEndpointMap<S = {}> = { [K in keyof S]: ApiEndpoint };

export interface ResourceServiceBaseConfig {
  endpoints: { [index: string]: ApiEndpoint };
  entityKeyPath;
}

export class ResourceServiceBaseOptions implements ApiEndpointOptions {
  [index: string]: any;

  endpointKey?: string;
  params?: { [index: string]: string };
  queryParams?: { [index: string]: string | number };
  paths?: StringIndexable;
  headers?: Headers;
  urlOverride?: string;
}

export class ResourceServiceBase<
  C extends ResourceServiceBaseConfig = ResourceServiceBaseConfig,
  O extends ResourceServiceBaseOptions = ResourceServiceBaseOptions
> {
  protected readonly resourceId: (entity) => string | number;
  protected readonly endpoint: (key?: string) => ApiEndpoint;

  constructor(private _config: C) {
    if (_config === null || _config === undefined) {
      throw new Error("Must provide configuration for ResourceServiceBase!");
    }
    this.resourceId = function getResourceId(entity: Resource) {
      return safeGet(entity, this._config.entityKeyPath);
    };
    const endpoints = Object.keys(_config.endpoints).map(
      key => _config.endpoints[key]
    );
    if (endpoints.length === 1) {
      this.endpoint = () => endpoints[0];
    } else {
      this.endpoint = (key: string) => _config.endpoints[key];
    }
  }
}

export class GetResourceService<
  T = Resource,
  C extends ResourceServiceBaseConfig = ResourceServiceBaseConfig,
  O extends ResourceServiceBaseOptions = ResourceServiceBaseOptions
> extends ResourceServiceBase<C, O> {
  constructor(
    private getResourceServiceConfig: C,
    private _serializer: Serializer
  ) {
    super(getResourceServiceConfig);
  }

  public read<R = T>(options?: O): Observable<R> {
    const url =
      options.urlOverride || this.endpoint(options.endpointKey).list(options);

    return http
      .get<R>(url, options.headers)
      .pipe(map((data: any) => this._serializer.fromPlain(data) as R));
  }

  public readByID<R = T>(id: number, options?: O): Observable<R> {
    const url =
      options.urlOverride ||
      this.endpoint(options.endpointKey).read(id, options);

    return http
      .get<R>(url, options.headers)
      .pipe(map((data: any) => this._serializer.fromPlain(data) as R));
  }

  public list<R = T>(options?: O): Observable<R[]> {
    const url =
      options.urlOverride || this.endpoint(options.endpointKey).list(options);

    return http.get(url, options.headers).pipe(
      map((data: any) => {
        return this._serializer.fromPlainArray(data) as R[];
      })
    );
  }
}

export class UploadResourceService<
  T = Resource,
  C extends ResourceServiceBaseConfig = ResourceServiceBaseConfig,
  O extends ResourceServiceBaseOptions = ResourceServiceBaseOptions
> extends GetResourceService<T, C, O> {
  constructor(
    private resourceServiceConfig: C,
    private resourceSerializer: Serializer
  ) {
    super(resourceServiceConfig, resourceSerializer);
  }

  public create(item: T, options: Partial<O> = {}): Observable<T> {
    const url =
      options.urlOverride || this.endpoint(options.endpointKey).create(options);

    return http
      .post<T>(url, options.headers, this.resourceSerializer.toJson(item))
      .pipe(map(data => this.resourceSerializer.fromPlain(data) as T));
  }
}

export class ResourceService<
  T,
  C extends ResourceServiceBaseConfig = ResourceServiceBaseConfig,
  O extends ResourceServiceBaseOptions = ResourceServiceBaseOptions
> extends GetResourceService<T, C, O> {
  constructor(
    private resourceServiceConfig: C,
    private resourceSerializer: Serializer
  ) {
    super(resourceServiceConfig, resourceSerializer);
  }

  public create(item: T, options?: O): Observable<T> {
    const url =
      options.urlOverride || this.endpoint(options.endpointKey).create(options);

    return http
      .post<T>(url, options.headers, this.resourceSerializer.toJson(item))
      .pipe(map(data => this.resourceSerializer.fromPlain(data) as T));
  }

  public update(item: T, options?: O): Observable<T> {
    const url =
      options.urlOverride ||
      this.endpoint(options.endpointKey).update(
        item[this.resourceId(item)],
        options
      );

    return http
      .put<T>(url, options.headers, this.resourceSerializer.toJson(item))
      .pipe(map(data => this.resourceSerializer.fromPlain(data) as T));
  }

  public delete(id: number, options?: O) {
    const url =
      options.urlOverride ||
      this.endpoint(options.endpointKey).delete(id, options);

    return http.delete(url, options.headers);
  }
}
