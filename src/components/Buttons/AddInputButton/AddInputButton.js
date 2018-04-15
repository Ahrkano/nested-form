import React from 'react';

import './AddInputButton.css'
    
const addInputButton = (props) => {

    return (
        <button onClick={props.onButtonClick}>
            {props.children}
        </button>
    );
}

export default addInputButton;