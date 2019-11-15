import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { get } from "lodash";
import {
  GetResourceService,
  ResourceServiceBaseConfig,
  ResourceServiceBaseOptions,
  Serializer
} from "@arenglish/resource";

const camelCaseKeys = require("camelcase-keys");

export abstract class ProPublicaGetService<T> extends GetResourceService<
  T,
  ResourceServiceBaseConfig,
  ResourceServiceBaseOptions
> {
  constructor(private baseConfig: ResourceServiceBaseConfig) {
    super(baseConfig, new Serializer());
  }

  read<R>(options: ResourceServiceBaseOptions): Observable<R> {
    return this.getCamelCase(super.read<R>(options));
  }

  protected getNestedResult<T>(path: string, res: Observable<T>) {
    return res.pipe(
      map(res => {
        const nested = get(res, path);
        return nested;
      })
    );
  }

  private getCamelCase<T>(res: Observable<T>): Observable<T> {
    return res.pipe(
      map(res => {
        const camel = camelCaseKeys(res, { deep: true });
        return camel;
      })
    );
  }
}
