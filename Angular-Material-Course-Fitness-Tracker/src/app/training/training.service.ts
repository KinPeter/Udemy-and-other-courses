import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import * as UI from 'src/app/shared/ui.actions';
import * as Training from './training.actions';

@Injectable({
    providedIn: 'root'
})
export class TrainingService {
    private firebaseSubs: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private uiService: UIService,
        private store: Store<fromTraining.State>
    ) {}

    fetchAvailableExercises() {
        this.store.dispatch(new UI.StartLoading());
        this.firebaseSubs.push( this.db
            .collection('availableExercises')
            .snapshotChanges()
            .pipe(
                map((docArray: any) => {
                    return docArray.map((doc: any) => {
                        return {
                            id: doc.payload.doc.id,
                            ...doc.payload.doc.data()
                        };
                    });
                })
            )
            .subscribe((exercises: Exercise[]) => {
                this.store.dispatch(new Training.SetAvailableTrainings(exercises));
                this.store.dispatch(new UI.StopLoading());
            }, (error) => {
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackbar('Fetching failed, please try again later', 'OK', 5000);
            })
        );
    }

    fetchCompletedOrCanceledExercises() {
        this.store.dispatch(new UI.StartLoading());
        this.firebaseSubs.push( this.db.collection('finishedExercises')
            .valueChanges()
            .subscribe((exercises: Exercise[]) => {
                this.store.dispatch(new Training.SetFinishedTrainings(exercises));
                this.store.dispatch(new UI.StopLoading());
            }, (error) => {
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackbar('Fetching failed, please try again later', 'OK', 5000);
            })
        );
    }

    cancelSubscriptions() {
        this.firebaseSubs.forEach(sub => sub.unsubscribe());
    }

    startExercise(selectedId: string) {
        this.store.dispatch(new Training.StartTraining(selectedId));
    }
    completeExercise() {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((exercise) => {
            this.addDataToDatabase({
                ...exercise,
                date: new Date(),
                state: 'completed'
            });
            this.store.dispatch(new Training.StopTraining());
        });
    }
    cancelExercise(progress: number) {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((exercise) => {
            this.addDataToDatabase({
                ...exercise,
                duration: exercise.duration * (progress / 100),
                calories: exercise.calories * (progress / 100),
                date: new Date(),
                state: 'canceled'
            });
            this.store.dispatch(new Training.StopTraining());
        });
    }

    private addDataToDatabase(exercise: Exercise) {
        this.store.dispatch(new UI.StartLoading());
        this.db.collection('finishedExercises')
        .add(exercise)
        .then((result) => {
            // ...
        })
        .catch((error) => {
            this.uiService.showSnackbar('Saving failed, please try again later', 'OK', 5000);
        })
        .finally(() => {
            this.store.dispatch(new UI.StopLoading());
        });
    }
}
