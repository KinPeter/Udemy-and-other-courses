import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedState);

        case actionTypes.REMOVE_INGREDIENT:
            const updatedIngredient2 = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
            const updatedIngredients2 = updateObject(state.ingredients, updatedIngredient2);
            const updatedState2 = {
                ingredients: updatedIngredients2,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedState2);

        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
                error: false,
                building: false
            });

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { errror: true });

        default: 
            return state;
    }
};

export default reducer;