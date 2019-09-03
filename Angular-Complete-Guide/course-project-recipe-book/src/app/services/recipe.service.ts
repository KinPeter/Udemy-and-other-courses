import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];
    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Tasty Schnitzel',
    //         'A super-tasty Schnitzel - just awesome!',
    //         'https://loremflickr.com/320/240/schnitzel',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('French Fries', 20),
    //             new Ingredient('Lemon', 1),
    //             new Ingredient('Mayonaise', 1)
    //         ]
    //     ),
    //     new Recipe(
    //         'Big Fat Burger',
    //         'What else you need to say?',
    //         'https://loremflickr.com/320/240/burger',
    //         [
    //             new Ingredient('Meat', 2),
    //             new Ingredient('Buns', 2),
    //             new Ingredient('Bacon', 3),
    //             new Ingredient('Cheese', 2),
    //             new Ingredient('Salad', 2)
    //         ]
    //     ),
    // ];

    constructor(
        private slService: ShoppingListService
    ) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next([...this.recipes]);
    }

    getRecipes() {
        return [...this.recipes];
    }

    getRecipe(index: number): Recipe {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next([...this.recipes]);
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next([...this.recipes]);
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next([...this.recipes]);
    }
}
