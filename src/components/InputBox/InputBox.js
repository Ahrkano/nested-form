import React from 'react';

import './InputBox.css';
    
const inputBox = (props) => {
    let input = null;
    const marginLeft = 40 * props.level + 'px';

    switch(props.inputType) {
        case 'yesNo':
            input = (
                <div className="InputBox__radio-wrapper">
                    <input 
                        id={'radio1_' + props.id} 
                        type="radio" 
                        name={'yesNo' + props.id}  
                        value="yes" 
                        onChange={(event) => props.onInputChange(event, props.id)} />
                    <label htmlFor={'radio1_' + props.id}>Yes</label>
                    <input 
                        id={'radio2_' + props.id}
                        type="radio" 
                        name={'yesNo' + props.id}  
                        value="no" 
                        onChange={(event) => props.onInputChange(event, props.id)} />
                    <label htmlFor={'radio2_' + props.id}>No</label>
                </div>
            );
            break;
        case 'text':
            input = (
                <input
                    type="text" 
                    className="InputBox__input"
                    value={props.value} 
                    onChange={(event) => props.onInputChange(event, props.id)} />
            );
            break;
        case 'number':
            input = (
                <input 
                    type="number"
                    className="InputBox__input" 
                    onChange={(event) => props.onInputChange(event, props.id)} />
            );
            break
    }

    return (
        <div style={{marginLeft: marginLeft}} className="InputBox">
            <h4 className="InputBox__question">{props.question}</h4>
            {input}
        </div>
    );
}

export default inputBox;