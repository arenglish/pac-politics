import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";

export function isScrolledIntoView(el, checkOn: Observable<any> = of()) {
  return checkOn.pipe(
    map(event => {
      const rect = el.getBoundingClientRect();
      const elemTop = rect.top;
      const elemBottom = rect.bottom;

      // Only completely visible elements return true:
      const isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
      // Partially visible elements return true:
      //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
      return isVisible;
    })
  );
}

export interface IsInView {
  isInView: Observable<boolean>;
}
