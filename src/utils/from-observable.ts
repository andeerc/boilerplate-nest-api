import { Observable } from "rxjs";

export function fromObservable<T>(observable: Observable<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    observable.subscribe({
      next: resolve,
      error: reject,
    });
  });
}