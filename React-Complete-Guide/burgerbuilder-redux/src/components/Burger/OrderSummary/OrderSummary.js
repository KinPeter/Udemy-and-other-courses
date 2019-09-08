import React from 'react';

import Aux from '../../../hoc/Auxi';
import Button from '../../UI/Button/Button';

class orderSummary extends React.Component {

    render() {
        const ingredientSummary = Object.entries(this.props.ingredients).map((entry) => {
            return ( 
                <li key={entry[0]}>
                    <span style={{textTransform: 'capitalize'}}>{entry[0]}</span>
                    : {entry[1]}
                </li>
            );
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total: <b>$ {this.props.totalPrice.toFixed(2)}</b></p>
                <p>Continue to check-out?</p>
                <Button clicked={this.props.purchaseCanceled} btnType="Danger">CANCEL</Button>
                <Button clicked={this.props.purchaseContinued} btnType="Success">CONTINUE</Button>
            </Aux>
        );
    }
}

export default orderSummary;