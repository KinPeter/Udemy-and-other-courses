import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import * as fromRoot from 'src/app/app.reducer';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public exercises: Observable<Exercise[]>;

    constructor(
        public trainingService: TrainingService,
        private store: Store<fromTraining.State>
    ) { }

    ngOnInit() {
        this.trainingService.fetchAvailableExercises();
        this.exercises = this.store.select(fromTraining.getAvailableExercises);
        this.isLoading = this.store.select(fromRoot.getIsLoading);
    }

    onStartTraining(form: NgForm) {
        this.trainingService.startExercise(form.value.exercise);
    }

}
