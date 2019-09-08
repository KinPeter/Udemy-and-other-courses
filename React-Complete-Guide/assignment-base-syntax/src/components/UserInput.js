import React from 'react';

const userInput = (props) => {
    const style = {
        margin: '2rem 10rem',
        border: '1px solid red'
    }
    return (
        <input 
            type="text" 
            className="form-control w-50"
            style={style}
            onChange={props.changeName}
            value={props.currentName} />
    )
};

export default userInput;