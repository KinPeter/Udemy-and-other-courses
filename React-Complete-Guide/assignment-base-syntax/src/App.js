import React, { Component } from 'react';
import './App.css';
import UserInput from './components/UserInput';
import UserOutput from './components/UserOutput';

class App extends Component {
    state = {
        username: 'SuperPeter'
    }

    nameChangeHandler = (event) => {
        this.setState({ username: event.target.value });
    }

    render() {
        return (
            <div className="container mt-5">
                <UserInput changeName={this.nameChangeHandler} currentName={this.state.username} />
                <hr/>
                <UserOutput username={this.state.username} />
                <UserOutput username="Max" />
                <UserOutput username="Manu" />
            </div>
        );
    }
}

export default App;
