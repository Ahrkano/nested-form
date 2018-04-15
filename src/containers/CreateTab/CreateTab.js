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
        this.tree.add([`question_${uuidV4().slice(0, 8)}`, '', 'yesNo', 'noCondition', 1], 'rootNode', this.tree.traverseBF);

        this.props.onStateUpdate(this.tree);
    }

    addSubInput(parentId, parentLevel) {
        this.tree.add([`question_${uuidV4().slice(0, 8)}`, '', 'yesNo', '', parentLevel + 1], parentId, this.tree.traverseDF);
        this.props.onStateUpdate(this.tree);
    }

    onInputChangeHandler(event, questionId, inputType) {
        console.log(`
            questionValue: ${event.target.value}
            questionId: ${questionId}
            inputType: ${inputType}
        `);
        // on any change to input -> change dataStructure
        this.tree.traverseDF(function(node) {
            if(node.id === questionId) {
                node[inputType] = event.target.value;
            }
        });

        // update state
        this.props.onStateUpdate(this.tree);
    }

    render() {
        let inputNodes = [];

        if (this.props.data !== null) {
            console.log(this.props.data.root);
            this.tree.traverseDF.call(this.props.data, function(node) {  
                if (node.id !== 'rootNode') {
                    // inputNodes[node.id] = [node.question, node.type, node.condition, node.anchorLevel, node.parent.id];
                    inputNodes.push([node.id ,node.question, node.type, node.condition, node.anchorLevel, node.parent.id]);
                }
            });
        }

        console.log(inputNodes);
        const inputGroups = inputNodes.map(input => {
            return (
                <InputEditBox 
                    key={input[0]}
                    id={input[0]} 
                    value={input[1]} 
                    type={input[2]} 
                    condition={input[3]} 
                    level={input[4]} 
                    parent={input[5]} 
                    onInputChange={this.onInputChangeHandler.bind(this)} 
                    onSubInputAddition={this.addSubInput.bind(this)} 
                />
            );
        });
        // console.log(inputGroups);
        

        return (
            <div className="CreateTab">
                {inputGroups}
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