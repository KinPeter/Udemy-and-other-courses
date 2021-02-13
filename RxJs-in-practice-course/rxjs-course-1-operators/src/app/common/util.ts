import { Observable, Observer } from 'rxjs';

export function createHttpObservable(url: string) {
  return Observable.create((observer: Observer<any>) => {

    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, { signal })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          observer.error('Request failed with status code ' + response.status);
        }
      })
      .then((body) => {
        observer.next(body);
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      });

    return () => controller.abort();
  });
}

