import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
    editMode = false;
    id: number;
    recipeForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private recipeService: RecipeService
    ) { }

    get controls() {
        return (this.recipeForm.get('ingredients') as FormArray).controls;
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = +params.id;
            this.editMode = params.id != null;
            this.initForm();
        });
    }

    onSubmit() {
        if (this.editMode) {
            this.recipeService.updateRecipe(this.id, this.recipeForm.value);
        } else {
            this.recipeService.addRecipe(this.recipeForm.value);
        }
        this.onCancel();
    }

    onAddIngredient() {
        (this.recipeForm.get('ingredients') as FormArray).push(
            new FormGroup({
                name: new FormControl('', Validators.required),
                amount: new FormControl('', [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
            })
        );
    }

    onDeleteIngredient(index: number) {
        (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
    }

    onCancel() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    private initForm() {
        let recipeName = '';
        let imagePath = '';
        let description = '';
        const ingredients = new FormArray([]);

        if (this.editMode) {
            const recipe = this.recipeService.getRecipe(this.id);
            recipeName = recipe.name;
            description = recipe.description;
            imagePath = recipe.imagePath;
            if (recipe.ingredients) {
                recipe.ingredients.forEach((ingredient) => {
                    ingredients.push(new FormGroup({
                        name: new FormControl(ingredient.name, Validators.required),
                        amount: new FormControl(ingredient.amount, [
                            Validators.required,
                            Validators.pattern(/^[1-9]+[0-9]*$/)
                        ])
                    }));
                });
            }
        }

        this.recipeForm = new FormGroup({
            name: new FormControl(recipeName, Validators.required),
            imagePath: new FormControl(imagePath, Validators.required),
            description: new FormControl(description, Validators.required),
            ingredients
        });
    }


}
