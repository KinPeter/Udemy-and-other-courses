import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxi';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends React.Component {
        state = {
            error: null
        }

        constructor() {
            super()
            // interceptor: whenever we send a request, set state.error to null
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            
            // interceptor: whenever get an error (object), set it as state.error
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            // remove interceptors before component destroyed
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.request.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;