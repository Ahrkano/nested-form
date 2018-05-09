import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import InputButton from '../../Buttons/InputButton/InputButton';

export const returnCondition = props => {
    if (props.condition !== 'noCondition') {
        switch (props.parentType) {
            case 'text':
                return (
                    <Aux>
                        <select
                            id="questionType"
                            value={props.condition}
                            onChange={event => props.onInputChange(event, props.id, 'condition')}
                        >
                            <option value="equals">Equals</option>
                        </select>
                        <DebounceInput
                            debounceTimeout={300}
                            type="text"
                            id="questionInput"
                            value={props.conditionValue}
                            onChange={event =>
                                props.onInputChange(event, props.id, 'conditionValue')
                            }
                        />
                    </Aux>
                );
            case 'yesNo':
                return (
                    <Aux>
                        <select
                            id="questionType"
                            value={props.condition}
                            onChange={event => props.onInputChange(event, props.id, 'condition')}
                        >
                            <option value="equals">Equals</option>
                        </select>
                        <select
                            id="questionType"
                            value={props.conditionValue}
                            onChange={event =>
                                props.onInputChange(event, props.id, 'conditionValue')
                            }
                        >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </Aux>
                );
            default:
                return (
                    <Aux>
                        <select
                            id="questionType"
                            value={props.condition}
                            onChange={event => props.onInputChange(event, props.id, 'condition')}
                        >
                            <option value="equals">Equals</option>
                            <option value="greater">Greater than</option>
                            <option value="less">Less than</option>
                        </select>
                        <DebounceInput
                            debounceTimeout={300}
                            className="InputEditBox__number-input"
                            type="number"
                            id="questionInput"
                            value={props.conditionValue}
                            onChange={event =>
                                props.onInputChange(event, props.id, 'conditionValue')
                            }
                        />
                    </Aux>
                );
        }
    }
};

export const returnQuestionInput = props => {
    return (
        <div className="InputEditBox__question-value">
            <label htmlFor="questionInput">Question: </label>
            <DebounceInput
                debounceTimeout={300}
                id="questionInput"
                value={props.value}
                onChange={event => props.onInputChange(event, props.id, 'question')}
            />
        </div>
    );
};

export const returnQuestionType = props => {
    return (
        <div className="InputEditBox__question-type">
            <label htmlFor="questionType">Type: </label>
            <select
                id="questionType"
                value={props.type}
                onChange={event => props.onInputChange(event, props.id, 'type')}
            >
                <option value="yesNo">Yes / No</option>
                <option value="text">Text</option>
                <option value="number">Number</option>
            </select>
        </div>
    );
};

export const returnButtons = props => {
    return (
        <div className="InputEditBox__buttons">
            <InputButton
                className="InputButton__delete"
                onButtonClick={() => props.onInputDeletion(props.id, props.parent)}
            >
                Delete
            </InputButton>
            <InputButton
                className="InputButton__add-sub-input"
                onButtonClick={() => props.onSubInputAddition(props.id, props.level, props.type)}
            >
                Add Sub-Input
            </InputButton>
        </div>
    );
};
