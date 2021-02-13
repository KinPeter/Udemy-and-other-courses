import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay, throttle, throttleTime
} from 'rxjs/operators';
import { merge, fromEvent, Observable, concat, interval, forkJoin } from 'rxjs';
import { Lesson } from '../model/lesson';
import { createHttpObservable } from '../common/util';
import { RxJsLoggingLevel, debug, setRxJsLoggingLevel } from '../common/debug';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

  courseId: string;
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  @ViewChild('searchInput', { static: true }) input: ElementRef;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.courseId = this.route.snapshot.params['id'];

    this.course$ = createHttpObservable(`/api/courses/${this.courseId}`)
      .pipe(
        debug(RxJsLoggingLevel.INFO, 'course value')
      );

    setRxJsLoggingLevel(RxJsLoggingLevel.DEBUG); // set logging level lower or higher to debug

    // this.lessons$ = this.loadLessons();
    // forkJoin(this.course$, this.lessons$) // sends requests in paralell and wait for both of them to complete
    //   .pipe(
    //     tap(([course, lessons]) => {
    //       console.log(course, lessons);
    //     })
    //   )
    //   .subscribe();
  }

  ngAfterViewInit() {

    // const searchLessons$ = fromEvent(this.input.nativeElement, 'keyup')
    //   .pipe(
    //     map((event: any) => event.target.value),
    //     debounceTime(500),
    //     distinctUntilChanged(),
    //     switchMap(searchTerm => {
    //       return this.loadLessons(searchTerm);
    //     }),
    //   );

    // const initialLessons$ = this.loadLessons();

    // this.lessons$ = concat(initialLessons$, searchLessons$);

    this.lessons$ = fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        startWith(''), // fires an initial request with emtpy string so no need for initialLessons$ and concat
        debug(RxJsLoggingLevel.TRACE, 'search'), // our custom operator
        debounceTime(500), // fires request after input didn't change for .5 seconds
        // throttleTime(500), // fires a request after every .5 seconds if the input is changed
        // throttle(() => interval(500)), // similar to throttleTime but here logic can be added to change the throttle interval
        distinctUntilChanged(),
        switchMap(searchTerm => {
          return this.loadLessons(searchTerm);
        }),
        debug(RxJsLoggingLevel.DEBUG, 'lessons value')
      );

  }

  loadLessons(searchTerm = ''): Observable<Lesson[]> {
    return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${searchTerm}`)
      .pipe(
        map(res => res['payload']),
      );
  }


}
