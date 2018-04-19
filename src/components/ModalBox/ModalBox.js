import React from 'react';

import Modal from '../../../node_modules/react-overlays/lib/Modal';

import './ModalBox.css';
    
const modalBox = (props) => {

    const modalStyle = { 
        position: 'fixed', 
        zIndex: 1040, 
        top: 0, 
        left: 0, 
        height: '100vh', 
        width: '100vw' 
    };

    const backdropStyle = {
        ...modalStyle, 
        zIndex: 'auto', 
        backgroundColor: '#000', 
        opacity: 0.5
    };

    return (
        <Modal
            aria-labelledby='modal-label'
            style={modalStyle}
            backdropStyle={backdropStyle}
            show={props.showModal}
            onHide={props.close}
        >
            <div className="ModalBox__dialog" >
                <h4 id='modal-label' className="ModalBox__dialog-heading">{props.heading}</h4>
                <p className="ModalBox__dialog-content">{props.info}</p>
                <button className="ModalBox__button" onClick={props.close}>Close Modal</button>
            </div>
        </Modal>
    );
}

export default modalBox;