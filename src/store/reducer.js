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

const addInputFunction = (state, action) => {
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

const addSubInputFunction = (state, action) => {
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

const deleteInputFunction = (state, action) => {
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

const dataChangeFunction = (state, action) => {
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

const loadSampleDataFunction = (state, action) => {
    doInitialize = true;
    return {
        ...state,
        allQuestionsOrder: [...action.allQuestionsOrder],
        rootQuestionsOrder: [...action.rootQuestionsOrder],
        formObject: { ...action.formObject }
    };
};

const checkIfTreeToBePopulated = state => {
    doInitialize = false;
    if (state.allQuestionsOrder !== null) {
        populateTreeStructure(state.allQuestionsOrder, state.formObject, tree);
    }
};

const consoleState = state => {
    console.log(state);
};

const consoleTree = () => {
    console.log(tree);
};

const reducer = (state = initialState, action) => {
    if (doInitialize) {
        checkIfTreeToBePopulated(state);
    }
    switch (action.type) {
        case actionTypes.SET_EMPTY_INPUTS_INFO:
            return setEmptyInputsInfo(state, action);
        case actionTypes.ADD_INPUT_HANDLER:
            return addInputFunction(state, action);
        case actionTypes.ADD_SUB_INPUT_HANDLER:
            return addSubInputFunction(state, action);
        case actionTypes.DELETE_INPUT:
            return deleteInputFunction(state, action);
        case actionTypes.DATA_CHANGE:
            return dataChangeFunction(state, action);
        case actionTypes.LOAD_SAMPLE_DATA:
            return loadSampleDataFunction(state, action);
        case actionTypes.CONSOLE_STATE:
            return consoleState(state);
        case actionTypes.CONSOLE_TREE:
            return consoleTree();
        default:
            return state;
    }
};

export default reducer;
