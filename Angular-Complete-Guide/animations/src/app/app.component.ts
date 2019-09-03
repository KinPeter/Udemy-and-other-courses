import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [
        trigger('divState', [
            state('normal', style({
                backgroundColor: 'red',
                transform: 'translateX(0)'
            })),
            state('highlighted', style({
                backgroundColor: 'blue',
                transform: 'translateX(100px)'
            })),
            transition('normal <=> highlighted', animate(300)),
            // transition('highlighted => normal', animate(800))
        ]),
        trigger('wildState', [
            state('normal', style({
                backgroundColor: 'red',
                transform: 'translateX(0) scale(1)'
            })),
            state('highlighted', style({
                backgroundColor: 'blue',
                transform: 'translateX(100px) scale(1)'
            })),
            state('shrunken', style({
                backgroundColor: 'green',
                transform: 'translateX(0) scale(0.5)'
            })),
            transition('normal => highlighted', animate(300)),
            transition('highlighted => normal', animate(800)),
            transition('shrunken <=> *', [
                style({
                    backgroundColor: 'orange'
                }),
                animate(1000, style({
                    borderRadius: '50px'
                })),
                animate(500)
            ])
        ]),

        trigger('list1', [
            state('in', style({
                opacity: 1,
                transform: 'translateX(0)'
            })),
            transition('void => *', [ // slide-in animation
                style({ // initial style, before added to the DOM
                    opacity: 0,
                    transform: 'translateX(-100px)'
                }),
                animate(300)
            ]),
            transition('* => void', [ // slide-out animation
                animate(300, style({
                    opacity: 0,
                    transform: 'translateX(100px)'
                }))
            ])
        ]),

        trigger('list2', [
            state('in', style({
                opacity: 1,
                transform: 'translateX(0)'
            })),
            transition('void => *', [
                animate(1000, keyframes([ // keyframes in an array
                    style({
                        transform: 'translateX(-100px)',
                        opacity: 0,
                        offset: 0 // offset means the fraction of time of the whole animation time
                    }),
                    style({
                        transform: 'translateX(-50px)',
                        opacity: 0.5,
                        offset: 0.3
                    }),
                    style({
                        transform: 'translateX(-20px)',
                        opacity: 1,
                        offset: 0.8
                    }),
                    style({
                        transform: 'translateX(0)',
                        opacity: 1,
                        offset: 1
                    })
                ]))
            ]),
            transition('* => void', [ // slide-out animation
                group([ // grouping means the animations start at the same time, don't wait for each oter
                    animate(300, style({
                        color: 'red'
                    })),
                    animate(800, style({
                        transform: 'translateX(100px)',
                        opacity: 0
                    }))
                ])
            ])
        ]),
    ]
})
export class AppComponent {
    list = ['Milk', 'Sugar', 'Bread'];

    state = 'normal';
    wildState = 'normal';

    onAnimate() {
        this.state = this.state === 'normal' ? 'highlighted' : 'normal';
        this.wildState = this.wildState === 'normal' ? 'highlighted' : 'normal';
    }

    animationStarted(event) {
        console.log(event);
    }
    animationEnded(event) {
        console.log(event);
    }

    onShrink() {
        this.wildState = 'shrunken';
    }

    onAdd(item) {
        this.list.push(item);
    }

    onDelete(item) {
        this.list.splice(this.list.indexOf(item), 1);
    }
}
