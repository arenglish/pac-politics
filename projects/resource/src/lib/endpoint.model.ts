/* tslint:disable */

export type StringIndexable = { [index: string]: string };

export interface ApiEndpointOptions {
  paths?: StringIndexable;
  queryParams?: { [index: string]: string };
}

export class ApiEndpoint {
  private readonly host: (paths?: StringIndexable) => string;

  constructor(
    private _host: string,
    private _paths?: { [index: string]: string }
  ) {
    if (_paths) {
      this.host = (paths: StringIndexable = {}) => {
        let filledHost = this._host;
        Object.keys(paths).forEach(pathName => {
          const pathPlaceholder = this._paths[pathName];
          filledHost = filledHost.replace(pathPlaceholder, paths[pathName]);
        });

        return filledHost;
      };
    } else {
      this.host = () => this._host;
    }
  }

  create(options: ApiEndpointOptions = {}) {
    return this.attachQuaeryParams(this.host(options.paths), options);
  }
  read(entityId: string | number, options: ApiEndpointOptions = {}) {
    return this.attachQuaeryParams(
      `${this.host(options.paths)}/${entityId}`,
      options
    );
  }
  list(options: ApiEndpointOptions) {
    return this.attachQuaeryParams(this.host(options.paths), options);
  }
  update(entityId: string | number, options: ApiEndpointOptions) {
    return this.attachQuaeryParams(
      `${this.host(options.paths)}/${entityId}`,
      options
    );
  }
  delete(entityId: string | number, options: ApiEndpointOptions) {
    return this.attachQuaeryParams(
      `${this.host(options.paths)}/${entityId}`,
      options
    );
  }

  private attachQuaeryParams(url, options: ApiEndpointOptions) {
    if (!options.queryParams) {
      return url;
    }
    const queries = Object.keys(options.queryParams).map(
      key => key + "=" + options.queryParams[key]
    );
    return url + "?" + queries.join("&");
  }
}
