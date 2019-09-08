import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';

const ingredientReducer = (currentIngredients, action) => {
    switch (action.type) {
        case 'SET':
            return action.ingredients;
        case 'ADD':
            return [...currentIngredients, action.ingredient];
        case 'DELETE':
            return currentIngredients.filter(ing => ing.id !== action.id);
        default:
            throw new Error('Should not get there.');
    }
};

const Ingredients = () => {
    const dbUrl = 'https://react-my-burger-eae6f.firebaseio.com/hooks/ingredients.json';

    // const [userIngredients, setUserIngredients] = useState([]);
    const [userIngredients, dispatchIngredientAction] = useReducer(ingredientReducer, []);

    const { isLoading, error, data, sendRequest, requestExtra, identifier } = useHttp();
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState();
   
    // if [] as a second argument is NOT passed, useEffect runs after every render cycle (== componentDidUpdate lifecycle hook)
    useEffect(() => {
        console.log('Rendering component.');
    });

    // if it is passed, it runs only after the first render (== componentDidMount lifecycle hook)
    // useEffect(() => {
    //    ....
    // }, []); 

    // if a dependency is passed in the second argument array, it will run ONLY if that dependency changed, and not any other states/props
    useEffect(() => {
        if (!isLoading && !error && identifier === 'REMOVE_INGREDIENT') {
            dispatchIngredientAction({type: 'DELETE', id: requestExtra});
        } else if (!isLoading && !error && identifier === 'ADD_INGREDIENT') {
            dispatchIngredientAction({ type: 'ADD', ingredient: { ...requestExtra, id: data.name } });
        }
    }, [data, requestExtra, identifier, isLoading, error]);

    const addIngredientHandler = async (ingredient) => {
        sendRequest(dbUrl, 'POST', JSON.stringify(ingredient), ingredient, 'ADD_INGREDIENT');

        // setUserIngredients((prevState) => [...prevState, { ...ingredient, id: data.name }]);
        dispatchIngredientAction({ type: 'ADD', ingredient: { ...ingredient, id: data.name } });
    }

    // useCallback() will prevent this function (inside it) to be recreated at each render cycle
    const filteredIngredientsHandler = useCallback((filteredIngredients) => {
        // setUserIngredients(filteredIngredients);
        dispatchIngredientAction({ type: 'SET', ingredients: filteredIngredients });
    }, []);

    const removeIngredientHandler = useCallback(async (ingredientId) => {
        sendRequest(`https://react-my-burger-eae6f.firebaseio.com/hooks/ingredients/${ingredientId}.json`, 'DELETE', null, ingredientId, 'REMOVE_INGREDIENT');

    }, [sendRequest]);

    const clearError = useCallback(() => {
        // setError(null);
        // dispatchHttpAction({ type: 'CLEAR' });
    }, []);

    // useMemo is similar to useCallback, it prevents what is wrapped inside to rerender at each render cycle, if it's dependencies did not change, but it can contain whole components
    // also an alternative to wrap the component (in its file) itself in React.memo()
    const ingredientList = useMemo(() => {
        return (
            <IngredientList
                    ingredients={userIngredients}
                    onRemoveItem={removeIngredientHandler} />
        );
    }, [userIngredients, removeIngredientHandler])

    return (
        <div className="App">
            {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

            <IngredientForm
                onAddIngredient={addIngredientHandler}
                loading={isLoading} />

            <section>
                <Search onLoadIngredients={filteredIngredientsHandler} />
                {ingredientList}
            </section>
        </div>
    );
}

export default Ingredients;
