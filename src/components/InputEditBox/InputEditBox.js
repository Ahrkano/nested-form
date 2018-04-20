import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import './InputEditBox.css'

import InputButton from '../Buttons/InputButton/InputButton';
    
class InputEditBox extends Component {

    render() {
        const marginLeft = 40 * this.props.level + 'px';
        let condition = null;
        
        if(this.props.condition !== 'noCondition') {
            if(this.props.parentType === 'text') {
                condition = (
                    <Aux>
                        <select 
                            id="questionType"
                            value={this.props.condition} 
                            onChange={(event) => this.props.onInputChange(event, this.props.id, 'condition')}>
                            <option value="equals">Equals</option>
                        </select>
                        <input
                            type="text" 
                            id="questionInput" 
                            value={this.props.conditionValue} 
                            onChange={(event) => this.props.onInputChange(event, this.props.id, 'conditionValue')} />
                    </Aux>
                );
            } else if(this.props.parentType === 'yesNo') {
                condition = (
                    <Aux>
                        <select 
                            id="questionType"
                            value={this.props.condition} 
                            onChange={(event) => this.props.onInputChange(event, this.props.id, 'condition')}>
                            <option value="equals">Equals</option>
                        </select>
                        <select 
                            id="questionType"
                            value={this.props.conditionValue} 
                            onChange={(event) => this.props.onInputChange(event, this.props.id, 'conditionValue')}>
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
                            value={this.props.condition} 
                            onChange={(event) => this.props.onInputChange(event, this.props.id, 'condition')}>
                            <option value="equals">Equals</option>
                            <option value="greater">Greater than</option>
                            <option value="less">Less than</option>
                        </select>
                        <input
                            className="InputEditBox__number-input" 
                            type="number"
                            id="questionInput" 
                            value={this.props.conditionValue} 
                            onChange={(event) => this.props.onInputChange(event, this.props.id, 'conditionValue')} />
                    </Aux>
                );
            }
        }

        const questionInput = (
            <div className="InputEditBox__question-value">
                <label htmlFor="questionInput">Question: </label>
                <input 
                    id="questionInput" 
                    value={this.props.value} 
                    onChange={(event) => this.props.onInputChange(event, this.props.id, 'question')} />
            </div>
        );

        const type = (
            <div className="InputEditBox__question-type">
                <label htmlFor="questionType">Type: </label>
                <select 
                    id="questionType"
                    value={this.props.type} 
                    onChange={(event) => this.props.onInputChange(event, this.props.id, 'type')}>
                    <option value="yesNo">Yes / No</option>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                </select>
            </div>
        );

        return (
            <div className="InputEditBox" style={{ marginLeft: marginLeft }}>
                <div className="InputEditBox__content">
                    <h5 className="InputEditBox__question-id">{this.props.id}</h5>
                    {this.props.condition !== 'noCondition' ?
                        <div className="InputEditBox__condition">
                            <label>Condition: </label>
                            {condition}
                        </div>
                        : null}

                    {questionInput}
                    {type}
                </div>
                <div className="InputEditBox__buttons">
                    <InputButton
                        className="InputButton__delete"
                        onButtonClick={() => this.props.onInputDeletion(this.props.id, this.props.parent)}>
                        Delete
                    </InputButton>
                    <InputButton 
                        className="InputButton__add-sub-input"
                        onButtonClick={() => this.props.onSubInputAddition(this.props.id, this.props.level, this.props.type)}>
                        Add Sub-Input
                    </InputButton>
                </div>
            </div>
        );
    }

}

export default InputEditBox;