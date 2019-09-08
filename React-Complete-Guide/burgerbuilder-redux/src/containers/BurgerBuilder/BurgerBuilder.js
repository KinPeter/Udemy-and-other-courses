import React from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends React.Component {

    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState = () => {
        let sum = 0;
        Object.values(this.props.ings).forEach((value) => {sum += value}); // getting total ingredients count
        return sum > 0;
    }
    
    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }
    
    purchaseContinueHandler = () => { 
        this.props.onInitPurchase();       
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = { ...this.props.ings };
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0; // each will be true or false, e.g. meat: true
        }

        // initially ordersummary is null, burger shows the spinner
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

        // only if the ingredients arrived from the server, we set the JSX elements
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        isAuth={this.props.isAuthenticated}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState()}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                totalPrice={this.props.price}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }


        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler} >
                    { orderSummary }
                </Modal>
                { burger }
            </Aux>
        );
    }
}

// REDUX - connect() state and actions dipatches
const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));