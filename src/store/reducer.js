import * as actionTypes from './actions';
import * as localStorageKeys from '../shared/localStorageKeys';
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
let doInitialize = true;

const setEmptyInputsInfo = (state, action) => {
    return {
        ...state,
        areInputsFilled: action.areInputsFilled,
        emptyInputs: action.emptyInputs
    };
};

const addInputAction = (state, action) => {
    addInput(tree, action.questionId);

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

const addSubInputAction = (state, action) => {
    addInput(tree, action.questionId, action.parentId, action.parentLevel, action.parentType);

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

const deleteInputAction = (state, action) => {
    tree.remove(action.childId, action.parentId, tree.traverseDF);

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

const dataChangeAction = (state, action) => {
    changeDataValueInTree(tree, action.event, action.questionId, action.inputType);

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

const checkIfTreeToBePopulated = state => {
    doInitialize = false;
    if (state.allQuestionsOrder !== null) {
        populateTreeStructure(state.allQuestionsOrder, state.formObject, tree);
    }
};

const reducer = (state = initialState, action) => {
    if (doInitialize) {
        checkIfTreeToBePopulated(state);
    }
    switch (action.type) {
        case actionTypes.SET_EMPTY_INPUTS_INFO:
            return setEmptyInputsInfo(state, action);
        case actionTypes.ADD_INPUT_HANDLER:
            return addInputAction(state, action);
        case actionTypes.ADD_SUB_INPUT_HANDLER:
            return addSubInputAction(state, action);
        case actionTypes.DELETE_INPUT:
            return deleteInputAction(state, action);
        case actionTypes.DATA_CHANGE:
            return dataChangeAction(state, action);
        default:
            return state;
    }
};

export default reducer;
