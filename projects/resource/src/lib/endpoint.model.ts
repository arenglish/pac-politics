/* tslint:disable */

export type StringIndexable = { [index: string]: string };

export interface ApiEndpointOptions {
  paths?: StringIndexable;
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
    return this.host(options.paths);
  }
  read(entityId: string | number, options: ApiEndpointOptions = {}) {
    return `${this.host(options.paths)}/${entityId}`;
  }
  list(options: ApiEndpointOptions) {
    return this.host(options.paths);
  }
  update(entityId: string | number, options: ApiEndpointOptions) {
    return `${this.host(options.paths)}/${entityId}`;
  }
  delete(entityId: string | number, options: ApiEndpointOptions) {
    return `${this.host(options.paths)}/${entityId}`;
  }
}
