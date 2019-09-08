export const orderFormObject = {
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
};