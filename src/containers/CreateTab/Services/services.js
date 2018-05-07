import React from 'react';
import InputEditBox from '../../../components/InputEditBox/InputEditBox';

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
    if (allQuestionsOrder) {
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
