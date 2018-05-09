import React from 'react';
import InputEditBox from '../../../components/InputEditBox/InputEditBox';
import InputButton from '../../../components/Buttons/InputButton/InputButton';

// Check for empty inputs in DOM
export const returnEmptyInputsQuantity = function(inputs) {
    const emptyInputs = [];

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            emptyInputs.push(input);
        }
    });

    return emptyInputs.length;
};

// highlight empty inputs
export const markEmptyInputs = function(inputs) {
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            input.style.boxShadow = '0 0 8px #ffcc00';
        } else {
            input.style.boxShadow = 'none';
        }
    });
};

// return inputGroups JSX array
export const returnInputGroupsJSX = function(
    allQuestionsOrder,
    formObject,
    onInputChangeHandler,
    addSubInputHandler,
    onInputDeleteHandler
) {
    if (allQuestionsOrder.length !== 0) {
        // if (allQuestionsOrder) {
        return allQuestionsOrder.map(questionId => {
            return (
                <InputEditBox
                    key={questionId}
                    id={questionId}
                    value={formObject[questionId].question}
                    type={formObject[questionId].inputType}
                    parentType={formObject[questionId].parentType}
                    condition={formObject[questionId].condition}
                    conditionValue={formObject[questionId].conditionValue}
                    level={formObject[questionId].level}
                    parent={formObject[questionId].parentId}
                    onInputChange={onInputChangeHandler}
                    onSubInputAddition={addSubInputHandler}
                    onInputDeletion={onInputDeleteHandler}
                />
            );
        });
    } else {
        return null;
    }
};

export const returnWelcomeMessage = (loadSampleData, dataFetching) => {
    let content = null;
    if (dataFetching) {
        content = <div className="loader">Loading...</div>;
    } else {
        content = (
            <div>
                <p>
                    This is a sample of <i>Tree Data Structure</i> (you decide how deep you want to
                    nest your sub-questions). As you switch to <i>Preview Tab</i> only root
                    questions are rendered. Answering to the question to match condition will cause
                    conditional question to render on the screen.
                </p>
                <p>
                    App was coded using <strong>React</strong>, <strong>React Router</strong> and
                    utilizes <strong>Redux</strong> to control data flow. Feel free to input your
                    own data or fetch sample data from <strong>Firebase</strong>.
                </p>
            </div>
        );
    }
    return (
        <div className="CreateTab__welcome-wrapper">
            <div className="CreateTab__welcome-message">
                <h1>
                    <strong>Hi</strong> there!
                </h1>
                <div className="CreateTab__welcome-message-content">{content}</div>
                <InputButton className="InputButton__load-data" onButtonClick={loadSampleData}>
                    Load Sample Data
                </InputButton>
            </div>
        </div>
    );
};
