import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];

    for (let ingrName in props.ingredients) {
        ingredients.push({
            name: ingrName,
            amount: props.ingredients[ingrName]
        });
    }

    const ingredientsOutput = ingredients.map((ingr) => {
        return <span 
            className={classes.Ingredient}
            key={ingr.name}>
            {ingr.name} ({ingr.amount})
            </span>;
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <b>$ {Number.parseFloat(props.price).toFixed(2)}</b></p>
        </div>
    );
};

export default order;