import { InjectionToken } from "@angular/core";
import { ApiEndpoint, ResourceServiceBaseConfig } from "@arenglish/resource";

export enum SERVICE_PATHS {
  members
}
export type ProPublicaServicePaths = keyof typeof SERVICE_PATHS;

const PRO_PUBLICA_HOST = "https://api.propublica.org/congress/v1/{subPath}";

const ProPublicaEndpoints: { [P in ProPublicaServicePaths]: ApiEndpoint } = {
  members: new ApiEndpoint(PRO_PUBLICA_HOST, {
    subPath: "{subPath}"
  })
};
export class ProPublicaConfig implements ResourceServiceBaseConfig {
  endpoints = ProPublicaEndpoints;
  entityKeyPath = "id";
  readonly headers = {
    "X-API-Key": "XHmLsDuRz3x59wsNN295qUN0IJAzkYCFXpIk11qJ"
  };

  constructor(headers?) {
    this.headers = headers || this.headers;
  }
}

export const PRO_PUBLICA_CONFIG = new InjectionToken(
  "Pro Publica Configuration Token",
  {
    providedIn: "root",
    factory: () => new ProPublicaConfig()
  }
);
