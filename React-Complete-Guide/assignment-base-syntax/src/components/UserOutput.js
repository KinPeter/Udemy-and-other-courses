import React from 'react';
import './UserOutput.css';

const userOutput = (props) => {
    return (
        <div className="user-output">
            <h5>{props.username}</h5>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, fugit?</p>
            <p>Lorem ipsum dolor sit amet.</p>
        </div>
    );
};

export default userOutput;