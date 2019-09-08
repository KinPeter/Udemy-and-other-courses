import React, { Component } from "react";
import { Transition, CSSTransition }  from 'react-transition-group';

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {

    state = {
        modalIsOpen: false,
        showBlock: false
    }

    showModal = () => {
        this.setState({ modalIsOpen: true });
    }
    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    render() {
        return (
            <div className="App">
                <h1>React Animations</h1>

                <button
                    onClick={() => {
                        this.setState(prevstate => ({showBlock: !prevstate.showBlock}))
                    }}
                    className="Button" >
                        Toggle
                </button>
                <Transition 
                    in={this.state.showBlock} 
                    timeout={1000}
                    mountOnEnter
                    unmountOnExit
                    onEnter={() => {console.log('onEnter');}}
                    onEntering={() => {console.log('onEntering');}}
                    onEntered={() => {console.log('onEntered');}}
                    onExit={() => {console.log('onExit');}}
                    onExiting={() => {console.log('onExiting');}}
                    onExited={() => {console.log('onExited');}} >
                    {(state) => (
                        <div style={{
                            backgroundColor: 'red', 
                            width: 100, 
                            height: 100,
                            margin: 'auto',
                            transition: 'opacity .3s ease-out',
                            opacity: state === 'exiting' ? 0 : 1
                        }}></div> 
                    )}
                </Transition>
              
                <br/>
                <br/>
                <Transition
                    in={this.state.modalIsOpen}
                    timeout={300}
                    mountOnEnter
                    unmountOnExit>
                    {(state) => {
                        return (
                            <Modal 
                                show={state} 
                                closed={this.closeModal} />
                        )
                    }}
                </Transition>

            {/* CSSTransition component, way #1 */}
                <CSSTransition
                    in={this.state.modalIsOpen}
                    timeout={300}
                    mountOnEnter
                    unmountOnExit
                    classNames="my-class">
                    {/* 
                        CSSTransition will apply the following classes automatically depending on the transition state, using the "trunk" classname added above as prop:
                        my-class-enter
                        my-class-enter-active
                        my-class-exit
                        my-class-exit-active
                        my-class-appear
                        my-class-appear-active
                        Thus we can write these (or at least enter-active and exit-active) classes to our CSS with the needed transition/animation properties
                    */}
                    <div>CssTransition way 1</div>
                    {/* or <MyCustomComponentHereAsChild /> */}
                </CSSTransition>
            
            {/* CSSTransition component, way #2 */}
                <CSSTransition
                    in={this.state.modalIsOpen}
                    timeout={300}
                    mountOnEnter
                    unmountOnExit
                    classNames={{
                        enter: 'my-enter-class',
                        enterActive: 'my-enter-active-class',
                        exit: 'my-exit-class',
                        exitActive: 'my-exit-active-class',
                        appear: 'my-appear-class',
                        appearActive: 'my-appear-active-class'
                    }}>
                    {/* 
                        CSSTransition will apply the above classes automatically depending on the transition state.
                        Thus we can write these (or at least enter-active and exit-active) classes to our CSS with the needed transition/animation properties
                    */}
                    <div>CssTransition way 2</div>
                    {/* or <MyCustomComponentHereAsChild /> */}
                </CSSTransition>
                
                <Backdrop 
                    show={this.state.modalIsOpen} />
                <button 
                    className="Button" 
                    onClick={this.showModal}>
                        Open Modal
                </button>

                <h3>Animating Lists</h3>
                <List />
            </div>
        );
    }
}

export default App;
