import { AbstractControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

type ValidatorReturnType = Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }>;

export const mimeType = (control: AbstractControl): ValidatorReturnType => {
    const file = control.value as File;
    const fileReader = new FileReader();
    const frObs = new Observable((observer: Observer<{ [key: string]: any }>) => {
        fileReader.addEventListener('loadend', () => {
            const arr = new Uint8Array(fileReader.result as ArrayBuffer);
            let header = '';
            arr.forEach((elem) => {
                header += elem.toString(16);
            });
            let isValid = false;
            switch (header) {
                case '89504e47':
                    isValid = true; break;
                case 'ffd8ffe0':
                case 'ffd8ffe1':
                case 'ffd8ffe2':
                case 'ffd8ffe3':
                case 'ffd8ffe8':
                    isValid = true; break;
                default:
                    isValid = false; break;
            }
            if (isValid) {
                observer.next(null);
            } else {
                observer.next({invalidMimeType: true});
            }
            observer.complete();
        });
        fileReader.readAsArrayBuffer(file);
    });
    return frObs;
};
