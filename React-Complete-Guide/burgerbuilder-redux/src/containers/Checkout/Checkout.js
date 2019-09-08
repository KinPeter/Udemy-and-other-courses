import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

class Checkout extends React.Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
        return (
            <div>
                {purchasedRedirect}
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};


export default connect(mapStateToProps)(Checkout);