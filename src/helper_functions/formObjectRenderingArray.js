export const formObjectRenderingArray = function(state, rootQuestionsOrder) {
    const questionsRenderArray = [];
        
    if (state && rootQuestionsOrder) {

        const questionRecursiveCall = function(questionId) {
            const parentId = state[questionId].parentId;
            
            if (state[questionId].parentId === 'rootNode') {
                questionsRenderArray.push(questionId);
            }
            
            if(state[questionId].parentId !== 'rootNode') {
                const parentAnswer = state[parentId].answer;
                const conditionalValue = state[parentId].conditionalQuestions[questionId].value;

                if (state[parentId].conditionalQuestions[questionId].type === 'equals') {
                    if (parentAnswer === conditionalValue && parentAnswer !== '') { questionsRenderArray.push(questionId); }
                } else {
                    if (state[parentId].conditionalQuestions[questionId].type === 'greater') {
                        if (parentAnswer > conditionalValue && parentAnswer !== '') { questionsRenderArray.push(questionId); }
                    }
    
                    if (state[parentId].conditionalQuestions[questionId].type === 'less') {
                        if (parentAnswer < conditionalValue && parentAnswer !== '') { questionsRenderArray.push(questionId); }
                    }
                }

                // test logs
                // console.table({
                //     parent: parentId,
                //     parentAnswer: parent.answer,
                //     conditionalQuestionId: questionId,
                //     conditionalAnswer: conditionalValue
                // });
            }

            if (Object.keys(state[questionId].conditionalQuestions)[0]) {
                for(let key in state[questionId].conditionalQuestions) {
                    questionRecursiveCall(key);
                }
            }
        }
        
        rootQuestionsOrder.map(rootQuestion => { questionRecursiveCall(rootQuestion); });

        return questionsRenderArray;
    }
}