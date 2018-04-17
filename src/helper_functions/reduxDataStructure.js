export const reduxDataStructure = function(treeStructure) {
    const allQuestionsOrder = [];
    const rootQuestionsOrder = [];
    const formObject = {};

    const arr = [treeStructure.root];

    while(arr.length) {
        // Depth-First Traverse
        const node = arr.shift();
        arr.unshift(...node.children);
        
        if (node.id !== 'rootNode') { allQuestionsOrder.push(node.id); }
        if (node.id !== 'rootNode' && node.parent.id === 'rootNode') { rootQuestionsOrder.push(node.id); }

        if (node.id !== 'rootNode') {
            formObject[node.id] = {
                conditionType: node.data.condition === 'noCondition' ? 'root' : 'conditional',
                condition: node.data.condition,
                conditionValue:  node.data.conditionValue,
                parentId: node.parent.id, 
                parentType: node.parent.id === 'rootNode' ? 'root' : node.parent.data.type,
                question: node.data.question.charAt(0).toUpperCase() + node.data.question.slice(1), 
                inputType: node.data.type,
                answer: '',
                level: node.data.anchorLevel,
                conditionalQuestions: {}
            };
        } 
    }

    allQuestionsOrder.forEach(questionId => {
        if (formObject[questionId].conditionType !== 'noCondition' && formObject[questionId].parentId !== 'rootNode' ) {
            const parentId = formObject[questionId].parentId;
            formObject[parentId].conditionalQuestions[questionId] = {
                type: formObject[questionId].condition,
                value: formObject[questionId].conditionValue
            }
        }
    });

    return [ allQuestionsOrder, rootQuestionsOrder, formObject ];
}