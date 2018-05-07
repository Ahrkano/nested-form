import * as actionTypes from './actions';
import * as localStorageKeys from '../../shared/localStorageKeys';
import { Tree } from '../data_structure/dataStructure';

import {
    populateTreeStructure,
    addInput,
    changeDataValueInTree,
    storeAndReturnArrangedData
} from './services/services';

const initialState = {
    allQuestionsOrder: null,
    rootQuestionsOrder: null,
    formObject: null
};

const tree = new Tree();

const updateState = state => {
    const [allQuestionsOrder, rootQuestionsOrder, formObject] = storeAndReturnArrangedData(
        tree,
        localStorageKeys.MAIN_KEY
    );

    return {
        ...state,
        allQuestionsOrder: [...allQuestionsOrder],
        rootQuestionsOrder: [...rootQuestionsOrder],
        formObject: { ...formObject }
    };
};

const setEmptyInputsInfo = (state, action) => {
    return {
        ...state,
        areInputsFilled: action.areInputsFilled,
        emptyInputs: action.emptyInputs
    };
};

const addInputAction = (state, action) => {
    addInput(tree, action.questionId);
    updateState(state);
};

const addSubInputAction = (state, action) => {
    addInput(tree, action.questionId, action.parentId, action.parentLevel, action.parentType);
    updateState(state);
};

const deleteInputAction = (state, action) => {
    tree.remove(action.childId, action.parentId, tree.traverseDF);
    updateState(state);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_STATE:
            return updateState(state, action);
        case actionTypes.SET_EMPTY_INPUTS_INFO:
            return setEmptyInputsInfo(state, action);
        case actionTypes.ADD_INPUT_HANDLER:
            return addInputAction(state, action);
        case actionTypes.ADD_SUB_INPUT_HANDLER:
            return addSubInputAction(state, action);
        case actionTypes.DELETE_INPUT:
            return deleteInputAction(state, action);
        default:
            return state;
    }
};

export default reducer;
