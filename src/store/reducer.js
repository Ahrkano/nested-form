import * as actionTypes from './actions';

const initialState = {  questionsArray: null }


const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.UPDATE_ARRAY) { return {questionsArray: [ ...action.questionArray ] }}
    
    return state;
}

export default reducer;