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

    addItemHandler() {
        // add item to data structure then update state
        console.log('[inside]: addItemHandler()');

        const passNewState = 'newState'
        this.props.onStateUpdate(passNewState);
    }

    render() {
        this.tree.add('VP of Happiness', 'CEO', this.tree.traverseBF);
        this.tree.add('VP of Finance', 'CEO', this.tree.traverseBF);
        this.tree.add('VP of Sadness', 'CEO', this.tree.traverseBF);

        this.tree.add('Director of Puppies', 'VP of Finance', this.tree.traverseBF);
        this.tree.add('Manager of Puppies', 'Director of Puppies', this.tree.traverseBF);

        this.tree.remove('Manager of Puppies', 'Director of Puppies', this.tree.traverseBF);

        console.log(this.tree);
        console.log(this.props.data);

        return (
            <div className="CreateTab">
                <h1>Create Tab</h1>
                <AddInputButton onButtonClick={this.addItemHandler.bind(this)} />
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