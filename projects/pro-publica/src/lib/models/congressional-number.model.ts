export interface CongressCycle {
  congress: number;
  year: number;
}

export class CongressionalNumber {
  private readonly firstCongress = 1;
  private readonly firstYear = 1789;
  cycles: CongressCycle[] = [];

  congress = 1;
  year = 1789;

  constructor(year?: number) {
    const currentTime = new Date();
    let currentYear = currentTime.getFullYear();

    const endOfThisYearsSession = new Date(`${currentYear}-03-1`).valueOf();

    if (currentYear % 2 === 0) {
      currentYear = currentYear + 1;
    } else if (currentTime.valueOf() > endOfThisYearsSession) {
      currentYear = currentYear + 2;
    }
    year = year || currentYear;

    const numberOfCongresses = (currentYear - this.firstYear) / 2;

    for (let i = 0; i <= numberOfCongresses; i++) {
      this.cycles.push({
        year: this.firstYear + i * 2,
        congress: this.firstCongress + i
      });
    }
    this.setYear(year);
  }

  setYear(year) {
    const diff = year - this.year;
    this.year = year;

    this.congress = this.congress + diff / 2;
  }
}
