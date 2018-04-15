import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import './InputEditBox.css'

import AddInputButton from '../Buttons/AddInputButton/AddInputButton';
    
const inputEditBox = (props) => {
    const marginLeft = 40 * props.level + 'px';

    let condition = null;
    if(props.condition !== 'noCondition') {
        if(props.parentType === 'text') {
            condition = (
                <Aux>
                    <select 
                        id="questionType"
                        value={props.condition} 
                        onChange={(event) => props.onInputChange(event, props.id, 'condition')}>
                        <option value="equals">Equals</option>
                    </select>
                    <input
                        type="text" 
                        id="questionInput" 
                        value={props.conditionValue} 
                        onChange={(event) => props.onInputChange(event, props.id, 'conditionValue')} />
                </Aux>
            );
        } else if(props.parentType === 'yesNo') {
            condition = (
                <Aux>
                    <select 
                        id="questionType"
                        value={props.condition} 
                        onChange={(event) => props.onInputChange(event, props.id, 'condition')}>
                        <option value="equals">Equals</option>
                    </select>
                    <select 
                        id="questionType"
                        value={props.conditionValue} 
                        onChange={(event) => props.onInputChange(event, props.id, 'conditionValue')}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </Aux>
            );            
        } else {
            condition = (
                <Aux>
                    <select 
                        id="questionType"
                        value={props.condition} 
                        onChange={(event) => props.onInputChange(event, props.id, 'condition')}>
                        <option value="equals">Equals</option>
                        <option value="greater">Greater than</option>
                        <option value="less">Less than</option>
                    </select>
                    <input 
                        type="number"
                        id="questionInput" 
                        value={props.conditionValue} 
                        onChange={(event) => props.onInputChange(event, props.id, 'conditionValue')} />
                </Aux>
            );
        }
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
            <label htmlFor="questionType">Type: </label>
            <select 
                id="questionType"
                value={props.type} 
                onChange={(event) => props.onInputChange(event, props.id, 'type')}>
                <option value="yesNo">Yes / No</option>
                <option value="text">Text</option>
                <option value="number">Number</option>
            </select>
        </div>
    );

    return (
        <div className="InputEditBox" style={{ marginLeft: marginLeft }}>
            <p>id: {props.id} | parent: {props.parent} | level: {props.level}</p>

            <div className="InputEditBox__condition">
                <label>Condition: </label>
                {condition}
            </div>

            {questionInput}
            {type}
            <div className="InputEditBox__button">
                <AddInputButton 
                    onButtonClick={() => props.onSubInputAddition(props.id, props.level, props.type)}>
                    Add Sub-Input
                </AddInputButton>
            </div>
        </div>
    );
}

export default inputEditBox;