import React from 'react';

import './InputEditBox.css'

import AddInputButton from '../Buttons/AddInputButton/AddInputButton';
    
const inputEditBox = (props) => {
    const marginLeft = 40 * props.level + 'px';

    let condition = null;
    if(props.condition !== 'noCondition') {
        condition = (
            <p>on condition</p>
        );
    }

    const questionInput = (
        <div className="InputEditBox__question-value">
            <label htmlFor="questionInput">Question: </label>
            <input 
                id="questionInput" 
                value={props.value} 
                onChange={(event) => props.onInputChange(event, props.id, 'question')} />
        </div>
    );

    const type = (
        <div className="InputEditBox__question-type">
            <label htmlFor="questionInput">Type: </label>
            <select 
                value={props.type} 
                onChange={(event) => props.onInputChange(event, props.id, 'type')}
            >
                <option value="yesNo">Yes / No</option>
                <option value="text">Text</option>
                <option value="number">Number</option>
            </select>
        </div>
    );

    return (
        <div className="InputEditBox" style={{ marginLeft: marginLeft }}>
            <p>id: {props.id}</p>
            {condition}
            {questionInput}
            {type}
            <div className="InputEditBox__button">
                <AddInputButton 
                    onButtonClick={() => props.onSubInputAddition(props.id, props.level)}>
                    Add Sub-Input
                </AddInputButton>
            </div>
            <p>parent: {props.parent}</p>
            <p>level: {props.level}</p>
        </div>
    );
}

export default inputEditBox;