import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidV4 from 'uuid/v4';
import { Tree } from '../../data_structure/dataStructure';
import { reduxDataStructure } from '../../helper_functions/reduxDataStructure';

import FlipMove from 'react-flip-move';
import { stateUpdate, setEmptyInputs } from '../../store/actions';
import * as localStorageKeys from '../../shared/localStorageKeys';

import { customEnterAnimation, customLeaveAnimation } from './AnimationsSettings/animationsSettings';

import { 
    populateTreeStructure,
    addInput,
    changeDataValueInTree,
    returnEmptyInputsQuantity, 
    markEmptyInputs 
} from './Services/services';

import InputButton from '../../components/Buttons/InputButton/InputButton';
import InputEditBox from '../../components/InputEditBox/InputEditBox';

import './CreateTab.css';
    
class CreateTab extends Component {
    constructor() {
        super();
        this.tree = null;
    }

    componentDidMount() { 
        this.tree = new Tree();
        populateTreeStructure(this.props.allQuestionsOrder, this.props.formObject, this.tree);
        setTimeout(this.areInputsFilled, 0);
    }

    addInputHandler = () => {
        addInput(this.tree, `question_${uuidV4().slice(0, 8)}`);

        this.updateAndStoreState();
        setTimeout(this.areInputsFilled, 0);
    }

    addSubInputHandler = (parentId, parentLevel, parentType) => {
        addInput(this.tree, `question_${uuidV4().slice(0, 8)}`, parentId, parentLevel, parentType);

        this.updateAndStoreState();
        setTimeout(this.areInputsFilled, 0);
    }

    onInputDeleteHandler = (childId, parentId) => {
        this.tree.remove(childId, parentId, this.tree.traverseDF);
        this.updateAndStoreState();
        setTimeout(this.areInputsFilled, 500); // wait with checking until inputEditBox is removed
    }

    onInputChangeHandler = (event, questionId, inputType) => {
        changeDataValueInTree(this.tree, event, questionId, inputType);

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
        const inputs = document.querySelectorAll('input'),
              emptyInputs = returnEmptyInputsQuantity(inputs);
        markEmptyInputs(inputs);
        this.props.onEmptyInputs((emptyInputs === 0) && (inputs.length > 0), emptyInputs);
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