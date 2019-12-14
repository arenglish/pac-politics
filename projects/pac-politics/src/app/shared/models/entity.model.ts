import { Observable, BehaviorSubject } from "rxjs";
import { shareReplay } from "rxjs/operators";

export class Entity<T> {
  protected readonly source$: BehaviorSubject<T>;
  readonly entities$: Observable<T>;

  constructor(source$: BehaviorSubject<T>) {
    this.source$ = source$;
    this.entities$ = this.source$.asObservable().pipe(shareReplay(1));
  }

  hydrate(source: T) {
    this.source$.next(source);
  }
}

export class Entities<T> extends Entity<T[]> {}
