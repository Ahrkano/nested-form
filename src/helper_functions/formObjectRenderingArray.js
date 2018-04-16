export const formObjectRenderingArray = function(state, rootQuestionsOrder) {
    const questionsRenderArray = [];
        
    if (state && rootQuestionsOrder) {

        const questionRecursiveCall = function(questionId) {
            const parentId = state[questionId].parentId;
            
            if (state[questionId].parentId === 'rootNode') {
                questionsRenderArray.push(questionId);
            }
            
            if(state[questionId].parentId !== 'rootNode') {
                const parent = state[parentId];
                const conditionalValue = state[parentId].conditionalQuestions[questionId].value; 
                
                if (parent.answer.toLowerCase() === conditionalValue.toLowerCase()) {
                    questionsRenderArray.push(questionId);
                }
                
                // test logs
                console.table({
                    parent: parentId,
                    parentAnswer: parent.answer,
                    conditionalQuestionId: questionId,
                    conditionalAnswer: conditionalValue
                });
            }

            if (Object.keys(state[questionId].conditionalQuestions)[0]) {
                for(let key in state[questionId].conditionalQuestions) {
                    questionRecursiveCall(key);
                }
            }
        }

        setTimeout(() => console.log(state), 0);
        setTimeout(() => console.log(questionsRenderArray), 0);

        rootQuestionsOrder.map(rootQuestion => { questionRecursiveCall(rootQuestion); });

        return questionsRenderArray;
    }
}