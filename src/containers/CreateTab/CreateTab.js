import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidV4 from 'uuid/v4';
import { Tree } from '../../data_structure/dataStructure';

import FlipMove from 'react-flip-move';
import { stateUpdate, setEmptyInputs } from '../../store/actions';
import * as localStorageKeys from '../../shared/localStorageKeys';

import {
    customEnterAnimation,
    customLeaveAnimation
} from './AnimationsSettings/animationsSettings';

import {
    populateTreeStructure,
    addInput,
    changeDataValueInTree,
    storeAndReturnArrangedData,
    returnEmptyInputsQuantity,
    markEmptyInputs,
    returnInputGroupsJSX
} from './Services/services';

import InputButton from '../../components/Buttons/InputButton/InputButton';

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
        this.servicesOnDataChange(0);
    };

    addSubInputHandler = (parentId, parentLevel, parentType) => {
        addInput(this.tree, `question_${uuidV4().slice(0, 8)}`, parentId, parentLevel, parentType);
        this.servicesOnDataChange(0);
    };

    onInputDeleteHandler = (childId, parentId) => {
        this.tree.remove(childId, parentId, this.tree.traverseDF);
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
            dispatch(setEmptyInputs(inputsStateBoolean, numberOfEmptyInputs))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTab);
