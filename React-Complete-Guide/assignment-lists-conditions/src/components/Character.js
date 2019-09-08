import React from 'react';
import './Character.css';

export const Character = (props) => {
    return <div className="char btn btn-warning" onClick={props.click}>{props.char}</div>;
}