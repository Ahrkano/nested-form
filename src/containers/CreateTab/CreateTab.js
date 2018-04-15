import React, { Component } from 'react';
import uuidV4 from 'uuid/v4';
import { Node, Tree } from '../../data_structure/dataStructure';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import './CreateTab.css';

import InputButton from '../../components/Buttons/InputButton/InputButton';
import InputEditBox from '../../components/InputEditBox/InputEditBox';
    
class CreateTab extends Component {
    constructor() {
        super();
        this.tree = null;
    }

    componentWillMount() {
        this.tree = new Tree();
        if (this.props.questionArray) {  
            this.props.questionArray.forEach(questionItem => {
                this.tree.add({
                    id: questionItem.id,
                    question: questionItem.question,
                    type: questionItem.type,
                    parentType: questionItem.parentType,
                    condition: questionItem.condition,
                    conditionValue: questionItem.conditionValue,
                    anchorLevel: questionItem.anchorLevel
                }, questionItem.parentId, this.tree.traverseDF);
            });
        }
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

        this.props.onStateUpdate(this.reduxStateArray());
    }

    addSubInputHandler(parentId, parentLevel, parentType) {
        this.tree.add({
            id: `question_${uuidV4().slice(0, 8)}`,
            question: '',
            type: 'yesNo',
            parentType: parentType,
            condition: '',
            conditionValue: '',
            anchorLevel: parentLevel + 1
        }, parentId, this.tree.traverseDF);

        this.props.onStateUpdate(this.reduxStateArray());
    }

    onInputDeleteHandler(childId, parentId) {
        this.tree.remove(childId, parentId, this.tree.traverseDF);

        this.props.onStateUpdate(this.reduxStateArray());
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
        this.props.onStateUpdate(this.reduxStateArray());
    }

    reduxStateArray() {
        const inputNodes = [];

        this.tree.traverseDF(function(node) {  
            if (node.id !== 'rootNode') {
                inputNodes.push({
                    id: node.id,
                    question: node.data.question,
                    type: node.data.type,
                    parentType: node.data.parentType,
                    condition: node.data.condition,
                    conditionValue: node.data.conditionValue,
                    anchorLevel: node.data.anchorLevel,
                    parentId: node.parent.id
                });
            }
        });

        return inputNodes;
    }

    render() {
        let inputGroups = null;
        
        if (this.props.questionArray) {
            inputGroups = this.props.questionArray.map(inputData => {
                return (
                    <InputEditBox 
                        key={inputData.id}
                        id={inputData.id} 
                        value={inputData.question} 
                        type={inputData.type} 
                        parentType={inputData.parentType}
                        condition={inputData.condition}
                        conditionValue={inputData.conditionValue} 
                        level={inputData.anchorLevel} 
                        parent={inputData.parentId} 
                        onInputChange={this.onInputChangeHandler.bind(this)} 
                        onSubInputAddition={this.addSubInputHandler.bind(this)}
                        onInputDeletion={this.onInputDeleteHandler.bind(this)} 
                    />
                );
            });  
        }   

        return (
            <div className="CreateTab">
                {inputGroups}
                <InputButton onButtonClick={this.addInputHandler.bind(this)}>Add Input</InputButton>
            </div>
        );
    }
};

const mapStateToProps = state => { return { questionArray: state.questionsArray }; };

const mapDispatchToProps = dispatch => {
    return {
        onStateUpdate: (newQuestionArray) => dispatch({type: actionTypes.UPDATE_ARRAY, questionArray: newQuestionArray})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTab);