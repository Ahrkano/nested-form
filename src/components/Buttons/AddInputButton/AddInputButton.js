import React from 'react';

import './AddInputButton.css'
    
const addInputButton = (props) => {

    return (
        <button onClick={props.onButtonClick}>
            Add Item
        </button>
    );
}

export default addInputButton;