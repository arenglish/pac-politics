import { PtoYear } from '../services/session.service';

export function getDaysUsedFromYear(year: PtoYear): number {
  return (year.entries || []).reduce((used, pto) => {
    return used + (pto.days || 0);
  }, 0)
}
