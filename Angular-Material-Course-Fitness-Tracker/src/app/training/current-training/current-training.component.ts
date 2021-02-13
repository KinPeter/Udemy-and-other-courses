import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';

@Component({
    selector: 'app-current-training',
    templateUrl: './current-training.component.html',
    styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {

    progress = 0;
    timer: any;
    dialogSubscription: Subscription;

    constructor(
        private dialog: MatDialog,
        private trainingService: TrainingService,
        private store: Store<fromTraining.State>
    ) { }

    ngOnInit() {
        this.startOrResumeTimer();
    }

    startOrResumeTimer() {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((exercise) => {
            const step = exercise.duration / 100 * 1000;
            this.timer = setInterval(() => {
                this.progress += 1;
                if (this.progress >= 100) {
                    this.trainingService.completeExercise();
                    clearInterval(this.timer);
                }
            }, step);
        });
    }

    onStop() {
        clearInterval(this.timer);
        const dialogRef = this.dialog.open(StopTrainingComponent, {
            data: { progress: this.progress }
        });

        this.dialogSubscription = dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.trainingService.cancelExercise(this.progress);
            } else {
                this.startOrResumeTimer();
            }
        });
    }


    ngOnDestroy() {
        if (this.dialogSubscription) {
            this.dialogSubscription.unsubscribe();
        }
    }

}
