export enum APP_ENV {
  prod = "prod",
  stg = "stg",
  dev = "dev",
  local = "local"
}

export class Environment {
  private _env: keyof typeof APP_ENV = "local";
  isLocal = true;
  isDev = false;
  isStg = false;
  isProd = false;

  get env() {
    return this._env;
  }

  getEnvFromWindowURL(window: Window): keyof typeof APP_ENV {
    const href = window.location.href;
    if (href.includes("localhost")) {
      return APP_ENV.local;
    }

    const urlSplit = href.split(".");
    let env = APP_ENV.prod;

    urlSplit.every(segment => {
      if (APP_ENV[segment]) {
        env = APP_ENV[segment];
        return false;
      } else {
        return true;
      }
    });

    return env;
  }

  set env(env) {
    if (APP_ENV[env]) {
      this._env = env;
    }
  }

  constructor(window: Window) {
    this.env = this.getEnvFromWindowURL(window);
    this.isLocal = this.env === APP_ENV.local;
    this.isDev = this.env === APP_ENV.dev;
    this.isStg = this.env === APP_ENV.stg;
    this.isProd = this.env === APP_ENV.prod;
  }
}

export class EnvUrl<E extends string = string> {
  static placeholder = "{{EnvPlaceholder}}";
  private _placeholder = EnvUrl.placeholder;
  private _url = "";
  private _envClass: Environment;
  private _localPort: string;
  private readonly _localHostPlaceholder = "{port}";
  private readonly localHostAddress =
    "http://localhost:" + this._localHostPlaceholder;

  get url() {
    const toReplace = this._placeholder + ".";
    let replaceWith = this._envClass.env + ".";
    if (this._envClass.env === "local") {
      if (this._localPort) {
        return this.convertUrlIntoLocalHost();
      }
      replaceWith = "dev.";
    }
    if (this._envClass.env === "prod") {
      replaceWith = "";
    }
    return this._url.replace(toReplace, replaceWith);
  }

  private convertUrlIntoLocalHost() {
    const splitUrl = this._url.split(".com");
    if (splitUrl.length === 0) {
      return this._url;
    }

    splitUrl[0] = this.localHostAddress.replace(
      this._localHostPlaceholder,
      this._localPort
    );

    return splitUrl.join("");
  }

  constructor(
    placeholder: string,
    url: string,
    envClass: Environment,
    localPort?: string
  ) {
    this._placeholder = placeholder;
    this._url = url;
    this._envClass = envClass;

    if (localPort) {
      this._localPort = localPort;
    }
  }
}
