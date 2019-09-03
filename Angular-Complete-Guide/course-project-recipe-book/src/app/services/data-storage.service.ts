import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { Recipe } from '../models/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    private apiUrl = 'https://angular-course-recipebk.firebaseio.com/recipes.json';

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService
    ) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.apiUrl, recipes).subscribe((response) => {
            console.log(response);
        });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(this.apiUrl)
        .pipe(
            map((recipes) => {
                return recipes.map((recipe) => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }),
            tap((recipes) => {
                this.recipeService.setRecipes(recipes);
            })
        );
    }
}
