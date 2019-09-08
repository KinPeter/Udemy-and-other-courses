import React from 'react';
import './App.css';
import { Validator } from './components/Validator';
import { Character } from './components/Character';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textLength: 0,
            text: '',
            chars: []
        };
    }

    onChangeInput = (event) => {
        const text = event.target.value;
        const array = text.split('');
        this.setState({
            text: text,
            textLength: text.length,
            chars: array
        })
    }

    onCharClick = (index) => {
        const newChars = [...this.state.chars];
        newChars.splice(index, 1);
        const newText = newChars.join('');
        this.setState({
            chars: newChars, 
            text: newText, 
            textLength: newText.length
        });
    }

    render() {
        const charList = this.state.chars.map((char, index) => {
            return (
                <Character
                    key={index}
                    char={char}
                    click={() => this.onCharClick(index)} />);
        });

        return (
            <div className="container mt-5">
                <input 
                    type="text" 
                    className="form-control mb-2"
                    placeholder="Enter some text"
                    value={this.state.text}
                    onChange={this.onChangeInput}/>
                <p>
                    <span className="badge badge-primary py-2 px-3 mr-2">Length: {this.state.textLength}</span>
                    <Validator length={this.state.textLength} />
                </p>
                <div>
                    {charList}
                </div>
                {this.state.textLength > 0 ? <p className="text-muted font-italic">Click on a character to remove it.</p> : null } 
            </div>
        );
    }
}
