import React from 'react';

import './ModalBox.css';
    
const modalBox = (props) => {

    const dialogAnimationClasses = [
        'ModalBox__dialog',
        props.state === 'entering' 
        ? 'ModalBox__dialog--open' 
        : props.state === 'exiting' ? 'ModalBox__dialog--close' : null
    ] 

    const backdropAnimationClassed = [
        'ModalBox__backdrop',
        props.state === 'entering' 
        ? 'ModalBox__backdrop--open' 
        : props.state === 'exiting' ? 'ModalBox__backdrop--close' : null
    ]

    return (
        <div className={backdropAnimationClassed.join(' ')} onClick={props.close}>   
            <div className={dialogAnimationClasses.join(' ')} >
                <h4 id='modal-label' className="ModalBox__dialog-heading">{props.heading}</h4>
                <p className="ModalBox__dialog-content">{props.info}</p>
                <button className="ModalBox__button" onClick={props.close}>Close Modal</button>
            </div>
        </div>
    );
}

export default modalBox;