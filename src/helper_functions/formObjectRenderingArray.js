export const formObjectRenderingArray = function(state, rootQuestionsOrder) {
    const questionsRenderArray = [];
    
    const resetChildAnswers = function(questionId) {
        console.log(`[inside resetChildAnswers()]: ${questionId}`);
        Object.keys(state[questionId].conditionalQuestions).forEach(childQuestionId => {
            state[childQuestionId].answer = '';
        });
    }
        
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
                        console.log(`line 31`);
                        resetChildAnswers(parentId); 
                    }

                } else if (conditionType === 'greater') {
                    parentAnswer !== '' ? parentAnswer = Number(parentAnswer) : parentAnswer;
                    conditionalValue = Number(conditionalValue);

                    if ((parentAnswer > conditionalValue) && parentAnswer !== '') { 
                        testPassed = true; 
                    } else { 
                        console.log(`line 42`);
                        resetChildAnswers(parentId); 
                    }

                } else if (conditionType === 'less') {
                    parentAnswer !== '' ? parentAnswer = Number(parentAnswer) : parentAnswer;
                    conditionalValue = Number(conditionalValue);

                    if ((parentAnswer < conditionalValue) && parentAnswer !== '') { 
                        testPassed = true; 
                    } else {
                        console.log(`line 53`); 
                        resetChildAnswers(parentId); 
                    }
                }
                

                // console.table({parent: parentId, parentAnswer: parent.answer, conditionalQuestionId: questionId, conditionalAnswer: conditionalValue});
            }

            if(testPassed) { questionsRenderArray.push(questionId); }

            if (Object.keys(state[questionId].conditionalQuestions)[0]) {
                for(let key in state[questionId].conditionalQuestions) { questionRecursiveCall(key); }
            }
        }
        
        rootQuestionsOrder.map(rootQuestion => { questionRecursiveCall(rootQuestion); });

        return questionsRenderArray;
    }
}