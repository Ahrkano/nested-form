import React from 'react';

export const returnInputBoxLogic = props => {
    switch (props.inputType) {
        case 'yesNo':
            return (
                <div className="InputBox__radio-wrapper">
                    <div className="InputBox__radio-group InputBox__radio-group--yes">
                        <input
                            id={'radio1_' + props.id}
                            type="radio"
                            name={'yesNo' + props.id}
                            value="yes"
                            onChange={event => props.onInputChange(event, props.id)}
                        />
                        <label htmlFor={'radio1_' + props.id}>Yes</label>
                    </div>
                    <div className="InputBox__radio-group InputBox__radio-group--no">
                        <input
                            id={'radio2_' + props.id}
                            type="radio"
                            name={'yesNo' + props.id}
                            value="no"
                            onChange={event => props.onInputChange(event, props.id)}
                        />
                        <label htmlFor={'radio2_' + props.id}>No</label>
                    </div>
                </div>
            );
        case 'text':
            return (
                <input
                    type="text"
                    className="InputBox__input"
                    value={props.value}
                    onChange={event => props.onInputChange(event, props.id)}
                />
            );
        case 'number':
            return (
                <input
                    type="number"
                    className="InputBox__input"
                    onChange={event => props.onInputChange(event, props.id)}
                />
            );
        default:
            console.log('sth went wrong: InputBox.js:line_52');
            break;
    }
};
