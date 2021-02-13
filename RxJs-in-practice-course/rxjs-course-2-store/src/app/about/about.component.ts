import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { concat, fromEvent, interval, noop, observable, Observable, of, timer, merge, Subject, AsyncSubject, ReplaySubject } from 'rxjs';
import { delayWhen, filter, map, take, timeout } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  ngOnInit() {
    // const subject = new Subject(); // late subscribers don't receive any value

    // const subject = new BehaviorSubject(0); // late subscribers only receive the last value

    // const subject = new AsyncSubject(); // only emits the final value after COMPLETION

    const subject = new ReplaySubject(); // late subscribers also receive all values
    
    const series$ = subject.asObservable(); // subject can be shared as observable to the "outside world"

    series$.subscribe(val => console.log('early sub: ' + val));
    
    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.complete();
    
    setTimeout(() => {
      series$.subscribe(val => console.log('late sub: ' + val));
    }, 1000)


  }


}






