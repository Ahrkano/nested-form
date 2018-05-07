import { reduxDataStructure } from '../../../helper_functions/reduxDataStructure';

import React from 'react';
import InputEditBox from '../../../components/InputEditBox/InputEditBox';

// // populate data structure on component mount
// export const populateTreeStructure = function(allQuestionsOrder, formObject, tree) {
//     if (allQuestionsOrder && formObject) {
//         allQuestionsOrder.forEach(questionId => {
//             tree.add(
//                 {
//                     id: questionId,
//                     question: formObject[questionId].question,
//                     type: formObject[questionId].inputType,
//                     parentType: formObject[questionId].parentType,
//                     condition: formObject[questionId].condition,
//                     conditionValue: formObject[questionId].conditionValue,
//                     anchorLevel: formObject[questionId].level
//                 },
//                 formObject[questionId].parentId,
//                 tree.traverseDF
//             );
//         });
//     }
// };

// // add input or subinput to dataStructure
// export const addInput = function(
//     tree,
//     questionId,
//     parentId = 'rootNode',
//     parentLevel = 0,
//     parentType = 'rootParent'
// ) {
//     tree.add(
//         {
//             id: questionId,
//             question: '',
//             type: 'yesNo',
//             parentType: parentType,
//             condition: parentType === 'rootParent' ? 'noCondition' : 'equals',
//             conditionValue:
//                 parentType === 'rootParent' ? 'noCondition' : parentType === 'yesNo' ? 'yes' : '',
//             anchorLevel: parentLevel + 1
//         },
//         parentId,
//         tree.traverseDF
//     );
// };

// // change data in Tree on any input change
// export const changeDataValueInTree = function(tree, event, questionId, inputType) {
//     tree.traverseDF(function(node) {
//         if (node.id === questionId) {
//             node.data[inputType] = event.target.value;

//             if (inputType === 'type') {
//                 node.children.forEach(child => {
//                     child.data.parentType = node.data.type;
//                     child.data.conditionValue = '';
//                 });
//             }
//         }
//     });
// };

// // store data in LocalStorage and return arranged Data
// export const storeAndReturnArrangedData = function(tree, storageKey) {
//     const [allQuestionsOrder, rootQuestionsOrder, formObject] = reduxDataStructure(tree);
//     const storedState = {
//         allQuestionsOrder: allQuestionsOrder,
//         rootQuestionsOrder: rootQuestionsOrder,
//         formObject: formObject
//     };
//     localStorage.setItem(storageKey, JSON.stringify(storedState));

//     return [allQuestionsOrder, rootQuestionsOrder, formObject];
// };

// Check for empty inputs in DOM
export const returnEmptyInputsQuantity = function(inputs) {
    const emptyInputs = [];

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            emptyInputs.push(input);
        }
    });

    return emptyInputs.length;
};

// highlight empty inputs
export const markEmptyInputs = function(inputs) {
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            input.style.boxShadow = '0 0 8px #ffcc00';
        } else {
            input.style.boxShadow = 'none';
        }
    });
};

// return inputGroups JSX array
export const returnInputGroupsJSX = function(
    allQuestionsOrder,
    formObject,
    onInputChangeHandler,
    addSubInputHandler,
    onInputDeleteHandler
) {
    if (allQuestionsOrder) {
        return allQuestionsOrder.map(questionId => {
            return (
                <InputEditBox
                    key={questionId}
                    id={questionId}
                    value={formObject[questionId].question}
                    type={formObject[questionId].inputType}
                    parentType={formObject[questionId].parentType}
                    condition={formObject[questionId].condition}
                    conditionValue={formObject[questionId].conditionValue}
                    level={formObject[questionId].level}
                    parent={formObject[questionId].parentId}
                    onInputChange={onInputChangeHandler}
                    onSubInputAddition={addSubInputHandler}
                    onInputDeletion={onInputDeleteHandler}
                />
            );
        });
    } else {
        return null;
    }
};
