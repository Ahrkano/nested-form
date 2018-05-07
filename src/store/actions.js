export const UPDATE_STATE = 'UPDATE_STATE';
export const SET_EMPTY_INPUTS_INFO = 'SET_EMPTY_INPUTS_INFO';
export const ADD_INPUT_HANDLER = 'ADD_INPUT_HANDLER';
export const ADD_SUB_INPUT_HANDLER = 'ADD_SUB_INPUT_HANDLER';
export const DELETE_INPUT = 'DELETE_INPUT';

export const setEmptyInputs = (inputsStateBoolean, numberOfEmptyInputs) => {
    return {
        type: SET_EMPTY_INPUTS_INFO,
        areInputsFilled: inputsStateBoolean,
        emptyInputs: numberOfEmptyInputs
    };
};

export const addInput = questionId => {
    return {
        type: ADD_INPUT_HANDLER,
        questionId: questionId
    };
};

export const addSubInput = (questionId, parentId, parentLevel, parentType) => {
    return {
        type: ADD_SUB_INPUT_HANDLER,
        questionId: questionId,
        parentId: parentId,
        parentLevel: parentLevel,
        parentType: parentType
    };
};

export const deleteInput = (childId, parentId) => {
    return {
        type: DELETE_INPUT,
        childId: childId,
        parentId: parentId
    };
};
