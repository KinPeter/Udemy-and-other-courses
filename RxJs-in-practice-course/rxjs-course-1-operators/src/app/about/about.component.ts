import { Component, OnInit } from '@angular/core';

import { interval, timer, fromEvent, Observable, Observer, noop, of, concat, merge } from 'rxjs';
import { createHttpObservable } from '../common/util';
import { map } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // const interval$ = interval(1000);

    // const intervalSub = interval$.subscribe((val) => console.log('stream 1 => ' + val));

    // // interval$.subscribe((val) => console.log('stream 2 => ' + val));


    // const timer$ = timer(3000, 1000);

    // const timerSub = timer$.subscribe((val) => console.log('timer 1 => ' + val));


    // setTimeout(() => {
    //   intervalSub.unsubscribe();
    //   timerSub.unsubscribe();
    // }, 6000);


    // const click$ = fromEvent(document, 'click');

    // click$.subscribe(

    //   (evt) => console.log(evt),

    //   (err) => console.log(err),

    //   () => console.log('completed')

    // );

    // const source1$ = of(1, 2, 3);
    // const source2$ = of(4, 5, 6);
    // const source3$ = of(7, 8, 9);
    // const result$ = concat(source1$, source2$, source3$); // gets to the next only if one is COMPLETED!
    // result$.subscribe(val => console.log(val));

    // const interval1$ = interval(1000);
    // const interval2$ = interval1$.pipe(map(val => val * 10));
    // const result$ = merge(interval1$, interval2$);
    // result$.subscribe(console.log);

    // const interval1$ = interval(1000);
    // const sub = interval1$.subscribe(console.log);
    // setTimeout(() => sub.unsubscribe(), 5000);

    // const http$ = createHttpObservable('/api/courses');
    // const sub = http$.subscribe(console.log);
    // setTimeout(() => sub.unsubscribe(), 0);

  }

}
