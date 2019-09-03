import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {

    recipes: Recipe[];
    subscription: Subscription;

    constructor(
        private recipeService: RecipeService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.subscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
            this.recipes = recipes;
        });
        this.recipes = this.recipeService.getRecipes();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onNewRecipe() {
        this.router.navigate(['new'], {relativeTo: this.route});
    }
}
