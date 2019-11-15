import { Observable, BehaviorSubject } from "rxjs";

export class Entity<T> {
  protected readonly source$: BehaviorSubject<T>;
  readonly entities$: Observable<T>;

  constructor(source$: BehaviorSubject<T>) {
    this.source$ = source$;
    this.entities$ = this.source$.asObservable();
  }

  hydrate(source: T) {
    this.source$.next(source);
  }
}

export class Entities<T> extends Entity<T[]> {}
