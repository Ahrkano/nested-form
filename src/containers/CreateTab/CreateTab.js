import React, { Component } from 'react';
import uuidV4 from 'uuid/v4';
import { Node, Tree } from '../../data_structure/dataStructure';
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
        this.tree.add({
            id: `question_${uuidV4().slice(0, 8)}`,
            question: '',
            type: 'yesNo',
            parentType: 'rootParent',
            condition: 'noCondition',
            conditionValue: 'noConditionValue',
            anchorLevel: 1
        }, 'rootNode', this.tree.traverseDF);

        this.props.onStateUpdate(this.tree);
    }

    addSubInput(parentId, parentLevel, parentType) {
        this.tree.add({
            id: `question_${uuidV4().slice(0, 8)}`,
            question: '',
            type: 'yesNo',
            parentType: parentType,
            condition: '',
            conditionValue: '',
            anchorLevel: parentLevel + 1
        }, parentId, this.tree.traverseDF);

        this.props.onStateUpdate(this.tree);
    }

    onInputChangeHandler(event, questionId, inputType) {
        // on any change to input -> change dataStructure
        this.tree.traverseDF(function(node) {
            if(node.id === questionId) {
                node.data[inputType] = event.target.value;

                if (inputType === 'type') {
                    node.children.forEach(child =>{ 
                        child.data.parentType = node.data.type;
                        child.data.conditionValue = ''; 
                    });
                }
            }
        });

        // update state
        this.props.onStateUpdate(this.tree);
    }

    render() {
        let inputNodes = [];

        if (this.props.data !== null) {
            this.tree.traverseDF.call(this.props.data, function(node) {  
                if (node.id !== 'rootNode') {
                    inputNodes.push([node.id, node.data.question, node.data.type, node.data.parentType, node.data.condition, node.data.conditionValue, node.data.anchorLevel, node.parent.id]);
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
                    parentType={input[3]}
                    condition={input[4]}
                    conditionValue={input[5]} 
                    level={input[6]} 
                    parent={input[7]} 
                    onInputChange={this.onInputChangeHandler.bind(this)} 
                    onSubInputAddition={this.addSubInput.bind(this)} 
                />
            );
        });        

        return (
            <div className="CreateTab">
                {inputGroups}
                <AddInputButton onButtonClick={this.addInputHandler.bind(this)}>Add Input</AddInputButton>
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