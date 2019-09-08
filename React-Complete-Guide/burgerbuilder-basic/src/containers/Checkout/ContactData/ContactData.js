import React from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';

class ContactData extends React.Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                label: 'Name:',
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your address'
                },
                label: 'Address:',
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your potal code'
                },
                label: 'Postal code:',
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your country'
                },
                label: 'Country:',
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                label: 'Email:',
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            deiveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: 'fastest',
                        display: 'Fastest'
                    }, {
                        value: 'cheapest',
                        display: 'Cheapest'
                    }]
                },
                label: 'Delivery method:',
                validation: {},
                value: 'fastest',
                valid: true // always valid as its a dropdown, needed to add it here for validation rules
            },
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        Object.entries(this.state.orderForm).forEach(([inputId, inputContent]) => {
            formData[inputId] = inputContent.value;
        });
        
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
        .then((response) => {
            this.setState({ loading: false });
            this.props.history.push('/');
            console.log(response);
        })
        .catch((error) => {
            this.setState({ loading: false });
            console.log(error);
        });
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
        if (this.state.loading) {
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

export default ContactData;