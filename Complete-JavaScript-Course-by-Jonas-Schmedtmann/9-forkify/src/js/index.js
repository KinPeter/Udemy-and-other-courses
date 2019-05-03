import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';
/** GLOBEL STATE OF THE APP 
* - search object
* - current recipe object
* - shopping list object
* - liked recipes 
*/
const state = {};

/**
* SEARCH CONTROLLER
*/
const controlSearch = async () => {
    //1. get the query from the view
    const query = searchView.getInput(); 
    console.log(`query: ${query}`);
    if (query) {
        //2. new search object and add to state
        state.search = new Search(query);
        //3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        //4. search for recipes
        await state.search.getResults();
        //5. render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
     
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

//const search = new Search('Pizza');
//console.log(search);
//search.getResults();

/**
* RECIPE CONTROLLER
*/
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    console.log(id);
    
    if (id) {
        //1. prepare ui for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        //1.5 highlight selected item
        if (state.search) searchView.highlightSelected(id);
        //2. create new recipe object
        state.recipe = new Recipe(id);
        //3. get recipe data
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();
        //4. calc servings and time
        state.recipe.calcServings();
        state.recipe.calcTime();
        //5. render recipe
        clearLoader();
        recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
        
        console.log(state.recipe);
        
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/**
* SHOPPING LIST CONTROLLER
*/
const controlList = () => {
    //create a new list if there is none yet
    if (!state.list) state.list = new List();
    //add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

// handling delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    // handle delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        //delete from state
        state.list.deleteItem(id);
        //delete from ui
        listView.deleteItem(id);
    // handle the count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }    
});


/**
* LIKES CONTROLLER
*/
state.likes = new Likes();
likesView.toggleLikeMenu(state.likes.getNumLikes());

const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;
    if (!state.likes.isLiked(currentID)) {
        //not liked yet
        //add like to the state
        const newLike = state.likes.addLike(
            currentID, 
            state.recipe.title,
            state.recipe.authon,
            state.recipe.img
        );
        //toggle like button
        likesView.toggleLikeBtn(true);
        //add like to ui list
        likesView.renderLike(newLike);
        
    } else {
        //already liked
        //remove like from state
        state.likes.deleteLike(currentID);
        //toggle like button
        likesView.toggleLikeBtn(false);
        //remove like from ui list
        likesView.deleteLike(currentID);
    };
    likesView.toggleLikeMenu(state.likes.getNumLikes());
}




// handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        //decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        //increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        //add item to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        //like controller
        controlLike();
        
    }
});
//const r = new Recipe(46956)
//r.getRecipe();
//console.log(r);



























