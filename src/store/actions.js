export const UPDATE_STATE = 'UPDATE_STATE';
export const SET_EMPTY_INPUTS_INFO = 'SET_EMPTY_INPUTS_INFO';
export const ADD_INPUT_HANDLER = 'ADD_INPUT_HANDLER';
export const ADD_SUB_INPUT_HANDLER = 'ADD_SUB_INPUT_HANDLER';

// export const stateUpdate = (allQuestionsOrder, rootQuestionsOrder, formObject) => {
//     return {
//         type: UPDATE_STATE,
//         allQuestionsOrder: allQuestionsOrder,
//         rootQuestionsOrder: rootQuestionsOrder,
//         formObject: formObject
//     };
// };

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
