import React, { Component } from 'react';
import { returnInputBoxLogic } from './services/services';

import './InputBox.css';

class InputBox extends Component {
    render() {
        let input = returnInputBoxLogic(this.props);
        const marginLeft = 40 * this.props.level + 'px';

        return (
            <div style={{ marginLeft: marginLeft }} className="InputBox">
                <h4 className="InputBox__question">{this.props.question}</h4>
                {input}
            </div>
        );
    }
}

export default InputBox;
