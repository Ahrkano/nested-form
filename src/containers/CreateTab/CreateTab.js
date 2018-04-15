import React, { Component } from 'react';
import uuidV4 from 'uuid/v4';
import { Node, Tree } from '../../data_structure/dataStructure';
// import { Question } from '../../data_structure/questionConstructor';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import './CreateTab.css';

import AddInputButton from '../../components/Buttons/AddInputButton/AddInputButton';
import InputEditBox from '../../components/InputEditBox/InputEditBox';
    
class CreateTab extends Component {
    constructor() {
        super();
        this.tree = new Tree();
        this.childNodes = 0;
    }

    addInputHandler() {
        this.tree.add([uuidV4(), '', 'yesNo', 'noCondition', 1], 'rootNode', this.tree.traverseBF);

        this.props.onStateUpdate(this.tree);
    }

    addSubInput(parentId, newInputId) {
        // console.log(this.props.data.root.children[0].id);
        const parentNode = this.props.data.root.children[0].id;
  
    }

    addSubInputSecondChild(parentId, newInputId) {
        // console.log(this.props.data.root.children[0].id);
        const parentNode = this.props.data.root.children[1].id;
  
        this.tree.add([uuidV4(), 'second child question', 'yesNo', 'noCondition', 1], parentNode, this.tree.traverseBF);
        this.props.onStateUpdate(this.tree);
    }

    onInputChangeHandler(event, questionId, inputId) {
        // on any change to input -> change dataStructure

        // update state
    }

    render() {
        let inputsGroup = [];

        if (this.props.data !== null) {
            console.log(this.props.data.root);
            this.tree.traverseDF.call(this.props.data, function(node) {  inputsGroup.push(node) });
        }

        console.log(inputsGroup);

        return (
            <div className="CreateTab">
                <AddInputButton onButtonClick={this.addInputHandler.bind(this)}>Add Input</AddInputButton>
            </div>
        );
    }
};

const mapStateToProps = state => { 
    return { 
        data: state.dataStructure,
        childNodes: state.childNodes 
    }; 
};

const mapDispatchToProps = dispatch => {
    return {
        onStateUpdate: (newState) => dispatch({type: actionTypes.UPDATE_STATE, state: newState})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTab);