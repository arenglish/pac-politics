// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { CongressionalNumber } from "@arenglish/pro-publica";
import { EnvUrl } from "env-url/lib/env-url.model";

const congressionalCycle = new CongressionalNumber(new Date().getFullYear());
export const environment = {
  production: false,
  assets: {
    logos: {
      republican: "/assets/republican-logo.jpg",
      democrat: "/assets/democrat-logo.png",
      independent: "/assets/independent-logo.svg"
    },
    seals: {
      house: "/assets/house-seal.svg",
      senate: "/assets/senate-seal.svg"
    }
  },
  congressionalCycle
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
