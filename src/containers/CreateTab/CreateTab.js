import React, { Component } from 'react';
import uuidV4 from 'uuid/v4';
import { Node, Tree } from '../../data_structure/dataStructure';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import './CreateTab.css';

import { reduxDataStructure } from '../../helper_functions/reduxDataStructure';

import InputButton from '../../components/Buttons/InputButton/InputButton';
import InputEditBox from '../../components/InputEditBox/InputEditBox';
import { setTimeout } from 'timers';
    
class CreateTab extends Component {
    constructor() {
        super();
        this.tree = null;
    }

    componentWillMount() {
        this.tree = new Tree();
        
        if (this.props.allQuestionsOrder && this.props.formObject) {
            this.props.allQuestionsOrder.forEach(questionId => {
                this.tree.add({
                    id: questionId,
                    question: this.props.formObject[questionId].question,
                    type: this.props.formObject[questionId].inputType,
                    parentType: this.props.formObject[questionId].parentType,
                    condition: this.props.formObject[questionId].condition,
                    conditionValue: this.props.formObject[questionId].conditionValue,
                    anchorLevel: this.props.formObject[questionId].level
                }, this.props.formObject[questionId].parentId, this.tree.traverseDF);
            });
        }
    }

    componentDidMount() {
        this.areInputsFilled();
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

        this.updateAndStoreState();
    }

    addSubInputHandler(parentId, parentLevel, parentType) {
        this.tree.add({
            id: `question_${uuidV4().slice(0, 8)}`,
            question: '',
            type: 'yesNo',
            parentType: parentType,
            condition: 'equals',
            conditionValue: parentType === 'yesNo' ? 'yes' : '',
            anchorLevel: parentLevel + 1
        }, parentId, this.tree.traverseDF);

        this.updateAndStoreState();
    }

    onInputDeleteHandler(childId, parentId) {
        this.tree.remove(childId, parentId, this.tree.traverseDF);
        this.updateAndStoreState();
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

        this.areInputsFilled();
        this.updateAndStoreState();
    }

    updateAndStoreState() {
        const [allQuestionsOrder, rootQuestionsOrder, formObject] = reduxDataStructure(this.tree);
        const storedState = {  
            allQuestionsOrder: allQuestionsOrder,
            rootQuestionsOrder: rootQuestionsOrder,
            formObject: formObject 
        };
        localStorage.setItem('nestedFormData##', JSON.stringify(storedState));

        this.props.onStateUpdate(allQuestionsOrder, rootQuestionsOrder, formObject);
    }

    areInputsFilled() {
        const inputs = document.querySelectorAll('input');
        const emptyInputs = [];

        inputs.forEach(input => {
            if (input.value.trim() === '') { 
                emptyInputs.push(input); 
                input.style.boxShadow = '0 0 8px #ffcc00';
            } else {
                input.style.boxShadow = 'none';
            }
        });
        const boolean = !(emptyInputs.length === 0);
        this.props.onEmptyInputs(boolean);
    }

    render() {
        let inputGroups = null;
    
        if (this.props.allQuestionsOrder) {
            inputGroups = this.props.allQuestionsOrder.map(questionId => {
                return (
                    <InputEditBox 
                        key={questionId}
                        id={questionId} 
                        value={this.props.formObject[questionId].question} 
                        type={this.props.formObject[questionId].inputType} 
                        parentType={this.props.formObject[questionId].parentType}
                        condition={this.props.formObject[questionId].condition}
                        conditionValue={this.props.formObject[questionId].conditionValue} 
                        level={this.props.formObject[questionId].level} 
                        parent={this.props.formObject[questionId].parentId} 
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
                <InputButton className="InputButton__add-input" onButtonClick={this.addInputHandler.bind(this)}>Add Input</InputButton>
            </div>
        );
    }
};

const mapStateToProps = state => { 
    return { 
        allQuestionsOrder: state.allQuestionsOrder,
        formObject: state.formObject 
    }; 
};

const mapDispatchToProps = dispatch => {
    return {
        onStateUpdate: (allQuestionsOrder, rootQuestionsOrder, formObject) => dispatch({
            type: actionTypes.UPDATE_STATE, 
            allQuestionsOrder: allQuestionsOrder,
            rootQuestionsOrder: rootQuestionsOrder,
            formObject: formObject
        }),
        onEmptyInputs: (emptyInputsBoolean) => dispatch({ 
            type: actionTypes.SET_EMPTY_INPUTS_INFO, 
            areSomeInputsEmpty: emptyInputsBoolean
        })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTab);