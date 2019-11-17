import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class FecService {
  pacs = [
    {
      acronym: "WALPAC",
      id: "C00093054"
    },
    {
      acronym: "Nat. Beer Assn.",
      id: "C00144766"
    },
    {
      acronym: "Nat. Assn. Realtors",
      id: "C00030718"
    }
  ];

  corsProxy = "https://arenglish-cors-proxy.herokuapp.com";

  headers = new HttpHeaders({
    "X-API-Key": "jZscVCHkCovja9OB6lXxUNcWWbH76LENbWUOpPmT"
  });

  constructor(private http: HttpClient) {}

  // getAllPACDetails(): Observable<any[]> {
  //   const requests = this.pacs.map((pac, index) => {
  //     return this.http
  //       .get(
  //         `${this.corsProxy}/https://api.open.fec.gov/v1/committee/${pac.id}`,
  //         {
  //           headers: this.headers
  //         }
  //       )
  //       .pipe(
  //         map(res => camelCaseKeys(res, { deep: true })),
  //         map((res: any) => {
  //           if (res.error) {
  //             throw res.error;
  //           }
  //           const pacDetails = res.results[0];
  //
  //           return plainToClass(Pac, {
  //             ...pacDetails,
  //             acronym: this.pacs[index].acronym
  //           });
  //         })
  //       );
  //   });
  //
  //   return forkJoin(...requests).pipe(
  //     catchError(err => {
  //       console.log(err);
  //       return of([]);
  //     })
  //   );
  // }
}
