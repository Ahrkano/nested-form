import React, { Component } from 'react';
import uuidV4 from 'uuid/v4';
import { Tree } from '../../data_structure/dataStructure';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';
// import * as actionTypes from '../../store/actions';
import { stateUpdate, setEmptyInputs } from '../../store/actions';
import * as localStorageKeys from '../../shared/localStorageKeys';

import './CreateTab.css';

import { reduxDataStructure } from '../../helper_functions/reduxDataStructure';

import InputButton from '../../components/Buttons/InputButton/InputButton';
import InputEditBox from '../../components/InputEditBox/InputEditBox';
    
class CreateTab extends Component {
    constructor() {
        super();
        this.tree = null;
    }

    componentDidMount() { 
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

        this.areInputsFilled();
    }

    addInputHandler = () => {
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
        setTimeout(this.areInputsFilled, 0);
    }

    addSubInputHandler = (parentId, parentLevel, parentType) => {
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
        setTimeout(this.areInputsFilled, 0);
    }

    onInputDeleteHandler = (childId, parentId) => {
        this.tree.remove(childId, parentId, this.tree.traverseDF);
        this.updateAndStoreState();
        // wait with checking until inputEditBox is removed
        setTimeout(this.areInputsFilled, 500);
    }

    onInputChangeHandler = (event, questionId, inputType) => {
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

        this.updateAndStoreState();
        setTimeout(this.areInputsFilled, 0);
    }

    updateAndStoreState() {
        const [allQuestionsOrder, rootQuestionsOrder, formObject] = reduxDataStructure(this.tree);
        const storedState = {  
            allQuestionsOrder: allQuestionsOrder,
            rootQuestionsOrder: rootQuestionsOrder,
            formObject: formObject 
        };
        localStorage.setItem(localStorageKeys.MAIN_KEY, JSON.stringify(storedState));

        this.props.onStateUpdate(allQuestionsOrder, rootQuestionsOrder, formObject);
    }

    areInputsFilled = () => {
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
        const boolean = (emptyInputs.length === 0) && (inputs.length > 0);
        const numberOfEmptyInputs = emptyInputs.length;
        this.props.onEmptyInputs(boolean, numberOfEmptyInputs);
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
                        onInputChange={this.onInputChangeHandler} 
                        onSubInputAddition={this.addSubInputHandler}
                        onInputDeletion={this.onInputDeleteHandler} 
                    />
                );
            });  
        }

        const customEnterAnimation = {
            from: { 
                opacity: 0,
                transform: 'translateX(-100%) scale(.7)' 
            },
            to: { 
                opacity: 1,
                transform: 'translateX(0) scale(1)' 
            }
        };

        const customLeaveAnimation = {
            from: { 
                opacity: 1,
                transform: 'translateX(0) scale(1)' 
            },
            to: { 
                opacity: 0,
                transform: 'translateX(100%) scale(.7)' 
            }
        };

        return (
            <div className="CreateTab">
                <div className="CreateTab__inputs-wrapper">
                    <FlipMove 
                        duration={350} 
                        easing="ease-out" 
                        enterAnimation={customEnterAnimation}
                        leaveAnimation={customLeaveAnimation}>
                        {inputGroups}
                    </FlipMove>
                </div>
                <div className="CreateTab__button-wrapper">
                    <InputButton 
                        className="InputButton__add-input" 
                        onButtonClick={this.addInputHandler}>
                        Add Input
                    </InputButton>
                </div>
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
        onStateUpdate: (allQstOrder, rootQstOrder, formObject) => dispatch(stateUpdate(allQstOrder, rootQstOrder, formObject)),
        onEmptyInputs: (inputsStateBoolean, numberOfEmptyInputs) => dispatch(setEmptyInputs(inputsStateBoolean, numberOfEmptyInputs))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTab);