import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidV4 from 'uuid/v4';
import axios from '../../axios-orders';

import FlipMove from 'react-flip-move';
import {
    setEmptyInputs,
    addInput,
    addSubInput,
    deleteInput,
    dataChange
} from '../../store/actions';

import { enterAnimation, leaveAnimation } from './AnimationsSettings/animationsSettings';

import {
    returnEmptyInputsQuantity,
    markEmptyInputs,
    returnInputGroupsJSX,
    returnWelcomeMessage
} from './services/services';

import InputButton from '../../components/Buttons/InputButton/InputButton';

import './CreateTab.css';

class CreateTab extends Component {
    componentDidMount() {
        // const sampleData = {
        //     formObject: this.props.formObject,
        //     allQuestionsOrder: this.props.allQuestionsOrder,
        //     rootQuestionsOrder: this.props.rootQuestionsOrder
        // };

        // axios.post('/.json', sampleData);
        setTimeout(this.areInputsFilled, 0);
    }

    addInputHandler = () => {
        this.props.onInputAddition(`question_${uuidV4().slice(0, 8)}`);
        setTimeout(this.areInputsFilled, 0);
    };

    addSubInputHandler = (parentId, parentLevel, parentType) => {
        this.props.onSubInputAddition(
            `question_${uuidV4().slice(0, 8)}`,
            parentId,
            parentLevel,
            parentType
        );
        setTimeout(this.areInputsFilled, 0);
    };

    onInputDeleteHandler = (childId, parentId) => {
        this.props.onInputDeletion(childId, parentId);
        setTimeout(this.areInputsFilled, 500); // wait with checking until inputEditBox is removed
    };

    onInputChangeHandler = (event, questionId, inputType) => {
        this.props.onDataChange(event, questionId, inputType);
        setTimeout(this.areInputsFilled, 0);
    };

    loadSampleData = () => {
        axios
            .get('/data.json')
            .then(response => {
                console.log(response.data[Object.keys(response.data)[0]]);
            })
            .catch(error => {
                console.log(error);
            });
    };

    areInputsFilled = () => {
        const inputs = document.querySelectorAll('input'),
            emptyInputs = returnEmptyInputsQuantity(inputs);
        markEmptyInputs(inputs);
        this.props.onEmptyInputs(emptyInputs === 0 && inputs.length > 0, emptyInputs);
    };

    render() {
        const inputGroups =
            returnInputGroupsJSX(
                this.props.allQuestionsOrder,
                this.props.formObject,
                this.onInputChangeHandler,
                this.addSubInputHandler,
                this.onInputDeleteHandler
            ) || returnWelcomeMessage(this.loadSampleData);

        return (
            <div className="CreateTab">
                <div className="CreateTab__inputs-wrapper">
                    <FlipMove
                        duration={350}
                        easing="ease-out"
                        enterAnimation={enterAnimation}
                        leaveAnimation={leaveAnimation}
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
        //
        rootQuestionsOrder: state.rootQuestionsOrder,
        //
        formObject: state.formObject
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onEmptyInputs: (inputsStateBoolean, numberOfEmptyInputs) =>
            dispatch(setEmptyInputs(inputsStateBoolean, numberOfEmptyInputs)),
        onInputAddition: questionId => dispatch(addInput(questionId)),
        onSubInputAddition: (questionId, parentId, parentLevel, parentType) =>
            dispatch(addSubInput(questionId, parentId, parentLevel, parentType)),
        onInputDeletion: (childId, parentId) => dispatch(deleteInput(childId, parentId)),
        onDataChange: (event, questionId, inputType) =>
            dispatch(dataChange(event, questionId, inputType))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTab);
