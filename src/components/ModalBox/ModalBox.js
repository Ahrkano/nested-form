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

    const dialogStyle = { 
        position: 'absolute', 
        width: 400, top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        border: '1px solid #e5e5e5', 
        backgroundColor: 'white', 
        boxShadow: '0 5px 15px rgba(0,0,0,.5)', 
        padding: 20 
    }

    return (
        <Modal
            aria-labelledby='modal-label'
            style={modalStyle}
            backdropStyle={backdropStyle}
            show={props.showModal}
            onHide={props.close}
        >
            <div style={dialogStyle} >
                <h4 id='modal-label'>{props.heading}</h4>
                <p>{props.info}</p>
            </div>
        </Modal>
    );
}

export default modalBox;