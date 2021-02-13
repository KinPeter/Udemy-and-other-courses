import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import * as moment from 'moment';
import { fromEvent, pipe } from 'rxjs';
import { concatMap, distinctUntilChanged, exhaustMap, filter, mergeMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  course: Course;

  @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course) {

    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required]
    });

  }

  ngOnInit() {

    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid),
        // mergeMap((changes) => this.saveCourse(changes)), // each save operation will fire requests paralelly
        // concatMap((changes) => this.saveCourse(changes)), // each save operation will wait for the previous one to complete (better use in this case)
      )
      .subscribe();


  }

  saveCourse(changes) {
    return fromPromise(fetch(`/api/courses/${this.course.id}`, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: { 'content-type': 'application/json' }
    }));
  }

  ngAfterViewInit() {

    fromEvent(this.saveButton.nativeElement, 'click')
      .pipe(
        // concatMap(() => this.saveCourse(this.form.value)), // each click will trigger the request, and with concatMap each request must complete before the next one is fired
        exhaustMap(() => this.saveCourse(this.form.value)), // each new click is IGNORED if the previous request is not completed yet (better use here)

      )
      .subscribe(console.log);

  }



  close() {
    this.dialogRef.close();
  }

}
