import React, { Component } from 'react';
import {
    returnCondition,
    returnQuestionInput,
    returnQuestionType,
    returnButtons
} from './services/services';

import './InputEditBox.css';

class InputEditBox extends Component {
    render() {
        const marginLeft = 40 * this.props.level + 'px';
        const condition = returnCondition(this.props);
        const questionInput = returnQuestionInput(this.props);
        const type = returnQuestionType(this.props);
        const buttons = returnButtons(this.props);

        return (
            <div className="InputEditBox" style={{ marginLeft: marginLeft }}>
                <div className="InputEditBox__content">
                    <h5 className="InputEditBox__question-id">{this.props.id}</h5>
                    {this.props.condition !== 'noCondition' ? (
                        <div className="InputEditBox__condition">
                            <label>Condition: </label>
                            {condition}
                        </div>
                    ) : null}

                    {questionInput}
                    {type}
                </div>
                {buttons}
            </div>
        );
    }
}

export default InputEditBox;
