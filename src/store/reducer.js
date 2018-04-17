import * as actionTypes from './actions';

const initialState = {  
    allQuestionsOrder: null,
    rootQuestionsOrder: null,
    formObject: null 
};


const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.UPDATE_STATE) { 
        return {
            allQuestionsOrder: [ ...action.allQuestionsOrder ], 
            rootQuestionsOrder: [ ...action.rootQuestionsOrder ],
            formObject: { ...action.formObject } 
        };
    }
    
    return state;
}

export default reducer;