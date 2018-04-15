import * as actionTypes from './actions';

const initialState = { dataStructure: null }


const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.UPDATE_STATE) { return { dataStructure: [ ...action.state ] }}

    return state;
}

export default reducer;