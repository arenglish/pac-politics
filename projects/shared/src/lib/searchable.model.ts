import { BehaviorSubject, combineLatest, Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";

export class Searchable<T, S> {
  private readonly _searchList$ = new BehaviorSubject<T[]>([]);
  protected readonly searchList$ = this._searchList$.asObservable();
  protected set searchList(list: T[]) {
    this._searchList$.next(list);
  }

  private readonly _searchValue$ = new Subject<S>();
  protected readonly searchValue$ = this._searchValue$.asObservable();
  protected set searchValue(val: any) {
    this._searchValue$.next(val);
  }

  protected readonly matchProjection: (a: S, b: T) => boolean;

  protected matches$: Observable<T[]> = combineLatest(
    this.searchList$,
    this.searchValue$
  ).pipe(
    map(([list, value]) => {
      const matches = (list || []).filter(el =>
        this.matchProjection(value, el)
      );
      return matches;
    })
  );

  constructor(matchProjection: (a: S, b: T) => boolean) {
    this.matchProjection = matchProjection;
  }
}
