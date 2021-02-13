import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, timer } from "rxjs";
import { tap, map, retryWhen, delayWhen, filter } from "rxjs/operators";

import { Course } from "../model/course";
import { createHttpObservable } from "./util";
import { fromPromise } from "rxjs/internal-compatibility";

@Injectable({
  providedIn: 'root'
})
export class Store {
  private subject = new BehaviorSubject<Course[]>([]);
  public courses$: Observable<Course[]> = this.subject.asObservable();

  init() {
    const http$ = createHttpObservable('/api/courses');

    http$
      .pipe(
        tap(() => console.log("HTTP request executed")),
        map(res => Object.values(res["payload"])),
        retryWhen(errors =>
          errors.pipe(
            delayWhen(() => timer(2000)
            )
          ))
      )
      .subscribe(
        (courses: Course[]) => this.subject.next(courses)
      );

  }

  selectBeginnerCourses() {
    return this.courses$
      .pipe(
        map(courses => courses
          .filter(course => course.category == 'BEGINNER'))
      );
  }
  selectAdvancedCourses() {
    return this.courses$
      .pipe(
        map(courses => courses
          .filter(course => course.category == 'ADVANCED'))
      );
  }

  selectCourseById(id: number) {
    return this.courses$
      .pipe(
        map(courses => courses.find(course => course.id == id)),
        filter(course => !!course)
      );
  }

  saveCourse(id: number, changes: Course): Observable<any> {
    const courses = this.subject.getValue();
    const courseIndex = courses.findIndex(course => course.id === id);
    const newCourses = [ ...courses ];
    newCourses[courseIndex] = {
      ...courses[courseIndex],
      ...changes,
    };
    this.subject.next(newCourses);

    return fromPromise(fetch(`/api/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: { 'content-type': 'application/json' }
    }));
  }

}