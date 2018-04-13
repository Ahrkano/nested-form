import * as actionTypes from './actions';

const initialState = {
    dataStructure: 'some value'
}


const reducer = (state = initialState, action) => {

    if (action.type === actionTypes.UPDATE_STATE) {
        console.log('state updating...')
        console.log(action.state);
    }

    return state;
}

export default reducer;