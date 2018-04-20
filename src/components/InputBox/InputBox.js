import React, { Component } from 'react';

import './InputBox.css';
    
class InputBox extends Component {

    render() {
        let input = null;
        const marginLeft = 40 * this.props.level + 'px';

        switch(this.props.inputType) {
            case 'yesNo':
                input = (
                    <div className="InputBox__radio-wrapper">
                        <div className="InputBox__radio-group InputBox__radio-group--yes">
                            <input 
                                id={'radio1_' + this.props.id} 
                                type="radio" 
                                name={'yesNo' + this.props.id}  
                                value="yes" 
                                onChange={(event) => this.props.onInputChange(event, this.props.id)} />
                            <label htmlFor={'radio1_' + this.props.id}>Yes</label>
                        </div>
                        <div className="InputBox__radio-group InputBox__radio-group--no">
                            <input 
                                id={'radio2_' + this.props.id}
                                type="radio" 
                                name={'yesNo' + this.props.id}  
                                value="no" 
                                onChange={(event) => this.props.onInputChange(event, this.props.id)} />
                            <label htmlFor={'radio2_' + this.props.id}>No</label>
                        </div>
                    </div>
                );
                break;
            case 'text':
                input = (
                    <input
                        type="text" 
                        className="InputBox__input"
                        value={this.props.value} 
                        onChange={(event) => this.props.onInputChange(event, this.props.id)} />
                );
                break;
            case 'number':
                input = (
                    <input 
                        type="number"
                        className="InputBox__input" 
                        onChange={(event) => this.props.onInputChange(event, this.props.id)} />
                );
                break
            default:
                console.log('sth went wrong: InputBox.js:line_52');
                break;
        }

        return (
            <div style={{marginLeft: marginLeft}} className="InputBox">
                <h4 className="InputBox__question">{this.props.question}</h4>
                {input}
            </div>
        );
    }
}

export default InputBox;