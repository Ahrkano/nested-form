import * as actionTypes from './actions';

const initialState = {
    allQuestionsOrder: null,
    rootQuestionsOrder: null,
    formObject: null
};

const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.UPDATE_STATE) {
        return {
            ...state,
            allQuestionsOrder: [...action.allQuestionsOrder],
            rootQuestionsOrder: [...action.rootQuestionsOrder],
            formObject: { ...action.formObject }
        };
    }

    if (action.type === actionTypes.SET_EMPTY_INPUTS_INFO) {
        return {
            ...state,
            areInputsFilled: action.areInputsFilled,
            emptyInputs: action.emptyInputs
        };
    }

    return state;
};

export default reducer;
