export const formObjectRenderingArray = function(state, rootQuestionsOrder) {
    const questionsRenderArray = [];
        
    if (state && rootQuestionsOrder) {

        const questionRecursiveCall = function(questionId) {
            let testPassed = false;
            const parentId = state[questionId].parentId;
            
            if (state[questionId].parentId === 'rootNode') { testPassed = true; }
            
            if(state[questionId].parentId !== 'rootNode') {
                let parentAnswer = state[parentId].answer;
                let conditionalValue = state[parentId].conditionalQuestions[questionId].value;
                const conditionType = state[parentId].conditionalQuestions[questionId].type;

                if (conditionType === 'equals') {
                    parentAnswer = parentAnswer.toString().toLowerCase();
                    conditionalValue = conditionalValue.toString().toLowerCase();

                    if (parentAnswer === conditionalValue && parentAnswer !== '') { 
                        testPassed = true; 
                    } else {
                        // zero all possible children answers
                    }
                } else if (conditionType === 'greater') {
                    parentAnswer !== '' ? parentAnswer = Number(parentAnswer) : parentAnswer;
                    conditionalValue = Number(conditionalValue);

                    if ((parentAnswer > conditionalValue) && parentAnswer !== '') { 
                        testPassed = true; 
                    } else {
                        // zero all possible children answers
                    }
                } else if (conditionType === 'less') {
                    parentAnswer !== '' ? parentAnswer = Number(parentAnswer) : parentAnswer;
                    conditionalValue = Number(conditionalValue);

                    if ((parentAnswer < conditionalValue) && parentAnswer !== '') { 
                        testPassed = true; 
                    } else {
                        // zero all possible children answers
                    }
                }
                

                // console.table({parent: parentId, parentAnswer: parent.answer, conditionalQuestionId: questionId, conditionalAnswer: conditionalValue});
            }

            // push questionId if condition is fulfilled
            if(testPassed) { questionsRenderArray.push(questionId); }

            if (Object.keys(state[questionId].conditionalQuestions)[0]) {
                for(let key in state[questionId].conditionalQuestions) { questionRecursiveCall(key); }
            }
        }
        
        rootQuestionsOrder.map(rootQuestion => { questionRecursiveCall(rootQuestion); });

        return questionsRenderArray;
    }
}