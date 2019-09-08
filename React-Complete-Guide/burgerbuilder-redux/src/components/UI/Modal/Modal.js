import React from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxi';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        //don't update the Modal if it's not shown
        return nextProps.show !== this.props.show  || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(200vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                    className={classes.Modal}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }    
}

export default Modal;