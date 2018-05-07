import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidV4 from 'uuid/v4';

import FlipMove from 'react-flip-move';
import {
    stateUpdate,
    setEmptyInputs,
    addInput,
    addSubInput,
    deleteInput
} from '../../store/actions';
import * as localStorageKeys from '../../shared/localStorageKeys';

import {
    customEnterAnimation,
    customLeaveAnimation
} from './AnimationsSettings/animationsSettings';

import {
    returnEmptyInputsQuantity,
    markEmptyInputs,
    returnInputGroupsJSX
} from './Services/services';

import InputButton from '../../components/Buttons/InputButton/InputButton';

import './CreateTab.css';

class CreateTab extends Component {
    componentDidMount() {
        setTimeout(this.areInputsFilled, 0);
    }

    addInputHandler = () => {
        this.props.onInputAddition(`question_${uuidV4().slice(0, 8)}`);
        this.servicesOnDataChange(0);
    };

    addSubInputHandler = (parentId, parentLevel, parentType) => {
        this.props.onSubInputAddition(
            `question_${uuidV4().slice(0, 8)}`,
            parentId,
            parentLevel,
            parentType
        );
        this.servicesOnDataChange(0);
    };

    onInputDeleteHandler = (childId, parentId) => {
        onInputDeletion(childId, parentId);
        this.servicesOnDataChange(500); // wait with checking until inputEditBox is removed
    };

    onInputChangeHandler = (event, questionId, inputType) => {
        changeDataValueInTree(this.tree, event, questionId, inputType);
        this.servicesOnDataChange(0);
    };

    areInputsFilled = () => {
        const inputs = document.querySelectorAll('input'),
            emptyInputs = returnEmptyInputsQuantity(inputs);
        markEmptyInputs(inputs);
        this.props.onEmptyInputs(emptyInputs === 0 && inputs.length > 0, emptyInputs);
    };

    servicesOnDataChange = timeout => {
        // update data and set new data in LocalStorage
        this.props.onStateUpdate(
            ...storeAndReturnArrangedData(this.tree, localStorageKeys.MAIN_KEY)
        );
        setTimeout(this.areInputsFilled, timeout);
    };

    render() {
        const inputGroups = returnInputGroupsJSX(
            this.props.allQuestionsOrder,
            this.props.formObject,
            this.onInputChangeHandler,
            this.addSubInputHandler,
            this.onInputDeleteHandler
        );

        return (
            <div className="CreateTab">
                <div className="CreateTab__inputs-wrapper">
                    <FlipMove
                        duration={350}
                        easing="ease-out"
                        enterAnimation={customEnterAnimation}
                        leaveAnimation={customLeaveAnimation}
                    >
                        {inputGroups}
                    </FlipMove>
                </div>
                <div className="CreateTab__button-wrapper">
                    <InputButton
                        className="InputButton__add-input"
                        onButtonClick={this.addInputHandler}
                    >
                        Add Input
                    </InputButton>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allQuestionsOrder: state.allQuestionsOrder,
        formObject: state.formObject
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onStateUpdate: (allQstOrder, rootQstOrder, formObject) =>
            dispatch(stateUpdate(allQstOrder, rootQstOrder, formObject)),
        onEmptyInputs: (inputsStateBoolean, numberOfEmptyInputs) =>
            dispatch(setEmptyInputs(inputsStateBoolean, numberOfEmptyInputs)),
        onInputAddition: questionId => dispatch(addInput(questionId)),
        onSubInputAddition: (questionId, parentId, parentLevel, parentType) =>
            dispatch(addSubInput(questionId, parentId, parentLevel, parentType)),
        onInputDeletion: (childId, parentId) => dispatch(deleteInput(childId, parentId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTab);
