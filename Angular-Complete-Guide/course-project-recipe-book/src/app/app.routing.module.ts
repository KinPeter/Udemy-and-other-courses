import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    // LAZY LOADING other modules:
    { path: 'recipes', loadChildren: './components/recipes/recipes.module#RecipesModule' },
    { path: 'auth', loadChildren: './components/auth/auth.module#AuthModule' },
    { path: 'shopping-list', loadChildren: './components/shopping-list/shopping-list.module#ShoppingListModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
