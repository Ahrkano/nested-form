export const UPDATE_STATE = 'UPDATE_STATE';
export const SET_EMPTY_INPUTS_INFO = 'SET_EMPTY_INPUTS_INFO';

export const stateUpdate = (allQuestionsOrder, rootQuestionsOrder, formObject) => {
    return {
        type: UPDATE_STATE, 
        allQuestionsOrder: allQuestionsOrder,
        rootQuestionsOrder: rootQuestionsOrder,
        formObject: formObject
    }
}

export const setEmptyInputs = (inputsStateBoolean, numberOfEmptyInputs) => {
    return { 
        type: SET_EMPTY_INPUTS_INFO, 
        areInputsFilled: inputsStateBoolean,
        emptyInputs: numberOfEmptyInputs
    }
}