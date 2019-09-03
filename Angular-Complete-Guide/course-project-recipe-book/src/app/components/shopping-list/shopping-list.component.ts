import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from 'src/app/services/logging.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

    ingredients: Ingredient[];
    private igChangeSub: Subscription;

    constructor(
        private slService: ShoppingListService,
        private loggingService: LoggingService
    ) { }

    ngOnInit() {
        this.ingredients = this.slService.getIngredients();
        this.igChangeSub = this.slService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
            this.ingredients = ingredients;
        });
        this.loggingService.printLog('Hello from ShoppingListComponent onInit');
    }

    ngOnDestroy() {
        this.igChangeSub.unsubscribe();
    }

    onEditItem(index: number) {
        this.slService.startedEditing.next(index);
    }

}
