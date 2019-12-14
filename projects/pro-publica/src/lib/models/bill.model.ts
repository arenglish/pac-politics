export type BillType = "introduced" | "updated";

const dateOptions = { year: "numeric", month: "long", day: "numeric" };

export class Bill {
  id: string;
  type: BillType;

  url: string;

  set billUri(val) {
    this.url = val;
  }

  set apiUri(val) {
    this.url = val;
  }

  number: string;

  shortTitle: string;
  title: string;
  introducedDate: string;
  introducedDateReadable: string;

  constructor(init: Partial<Bill> = {}) {
    Object.assign(this, init);
    if (init.introducedDate) {
      this.introducedDateReadable = new Date(
        init.introducedDate
      ).toLocaleDateString("en-US", dateOptions);
    }
  }
}
