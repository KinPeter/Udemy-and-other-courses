import React from 'react';

export const Validator = (props) => {
    if (props.length === 0) {
        return null;
    } else if (props.length <= 5) {
        return <span className="badge badge-danger py-2 px-3">Text too short</span>;
    } else {
        return <span className="badge badge-success py-2 px-3">Text long enough</span>;
    }
}