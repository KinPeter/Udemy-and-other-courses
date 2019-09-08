import React from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';
import { orderFormObject } from './OrderFormObject';
import wihtErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends React.Component {

    state = {
        orderForm: orderFormObject,
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        Object.entries(this.state.orderForm).forEach(([inputId, inputContent]) => {
            formData[inputId] = inputContent.value;
        });        
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token);        
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = Object.assign({}, this.state.orderForm); // clone state to keep original immutable
        updatedOrderForm[inputIdentifier].value = event.target.value;
        updatedOrderForm[inputIdentifier].valid = this.checkValidity(event.target.value, updatedOrderForm[inputIdentifier].validation);
        updatedOrderForm[inputIdentifier].touched = true;

        let formIsValid = true;
        Object.values(updatedOrderForm).forEach(config => {
            formIsValid = config.valid && formIsValid;
        });

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {

        const formElementsArray = [];
        Object.entries(this.state.orderForm).forEach(([key, value]) => {
            formElementsArray.push({
                id: key,
                config: value
            });
        });

        let form = (
            <form onSubmit={this.orderHandler}>                
                {formElementsArray.map((formElem) => (
                    <Input 
                        key={formElem.id} 
                        label={formElem.config.label} 
                        elementType={formElem.config.elementType} 
                        elementConfig={formElem.config.elementConfig}
                        value={formElem.config.value}
                        invalid={!formElem.config.valid}
                        shouldValidate={formElem.config.validation}
                        touched={formElem.config.touched}
                        changed={(event) => this.inputChangeHandler(event, formElem.id)} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        price: state.burgerBuilder.totalPrice,
        ings: state.burgerBuilder.ingredients,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(wihtErrorHandler(ContactData, axios));