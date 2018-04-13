import React, { Component } from 'react';
import { Node, Tree } from '../../data_structure/dataStructure';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import './CreateTab.css';

import AddInputButton from '../../components/Buttons/AddInputButton/AddInputButton';
    
class CreateTab extends Component {
    constructor() {
        super();
        this.tree = new Tree();
        this.rootNode = new Node('CEO');
        this.tree.root = this.rootNode;
    }

    addInputHandler() {
        // add input

    }

    addSubInput(parentId, newInputId) {
        // add sub-input
    }

    onInputChangeHandler(event, inputId) {
        // on any change to input -> change dataStructure

        // update state
        this.props.onStateUpdate(this.tree);
    }

    render() {
        // function -> inputs group render 
        let inputsGroup = <p>to be processed...</p>;
        // styling input box indentation depending on the data structure depth

        /*
        this.tree.add('VP of Happiness', 'CEO', this.tree.traverseBF);
        this.tree.add('VP of Finance', 'CEO', this.tree.traverseBF);
        this.tree.add('VP of Sadness', 'CEO', this.tree.traverseBF);

        this.tree.add('Director of Puppies', 'VP of Finance', this.tree.traverseBF);
        this.tree.add('Manager of Puppies', 'Director of Puppies', this.tree.traverseBF);

        this.tree.remove('Manager of Puppies', 'Director of Puppies', this.tree.traverseBF);
        */

        return (
            <div className="CreateTab">
                {inputsGroup}
                <AddInputButton onButtonClick={this.addInputHandler.bind(this)} />
            </div>
        );
    }
};

const mapStateToProps = state => { return { data: state.dataStructure }; };

const mapDispatchToProps = dispatch => {
    return {
        onStateUpdate: (newState) => dispatch({type: actionTypes.UPDATE_STATE, state: newState})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTab);