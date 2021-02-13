import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { interval, Observable, of, timer, noop, throwError } from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap, finalize } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';

const dummyCourse: Course = {
  id: 0,
  description: "RxJs In Practice Course",
  iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png',
  courseListIcon: 'https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png',
  longDescription: "Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples",
  category: 'BEGINNER',
  lessonsCount: 10
};

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor() {

  }

  ngOnInit() {

    const http$ = createHttpObservable('/api/courses');

    const courses$ = http$
      .pipe(
        tap(() => console.log('HTTP request sent')),
        // CATCH AND RETHROW STRATEGY
        // catchError(err => {
        //   console.log('Error occured: ', err);
        //   return throwError(err);
        // }),
        // finalize(() => {
        //   console.log('Finalize executed...');
        // }),
        
        map(res => res['payload']),
        shareReplay(),

        // RETRY STRATEGY
        retryWhen(errors => { // return the errors observable, but add logic to it:
          return errors.pipe(
            delayWhen(() => timer(2000)) // retry after 2 seconds
            );
          })
      );

    this.beginnerCourses$ = courses$
      .pipe(
        map((courses: Course[]) => courses.filter(course => course.category === 'BEGINNER'))
      );
      
    this.advancedCourses$ = courses$
      .pipe(
        map((courses: Course[]) => courses.filter(course => course.category === 'ADVANCED'))
      );

  }

}
