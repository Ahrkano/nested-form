export const formObjectRenderingArray = function(state, rootQuestionsOrder) {
    const questionsRenderArray = [];

    const checkIfConditionalQuestionsShouldRender = function() {
        const reversedQuestionsArray = [ ...questionsRenderArray ].reverse();
    
        reversedQuestionsArray.forEach(id => {
            const parentId = state[id].parentId;
            if ( parentId !== 'rootNode' && reversedQuestionsArray.indexOf(parentId) < 0 ) { 
                state[parentId].answer = '';
                
                const questionIndex = questionsRenderArray.indexOf(id);
                questionsRenderArray.splice(questionIndex, 1);
            }
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
                    } else { checkIfConditionalQuestionsShouldRender(); }

                } else if (conditionType === 'greater') {
                    if(parentAnswer !== '') { parentAnswer = Number(parentAnswer); }
                    conditionalValue = Number(conditionalValue);

                    if ((parentAnswer > conditionalValue) && parentAnswer !== '') { 
                        testPassed = true; 
                    } else { checkIfConditionalQuestionsShouldRender(); }

                } else if (conditionType === 'less') {
                    if(parentAnswer !== '') { parentAnswer = Number(parentAnswer); }
                    conditionalValue = Number(conditionalValue);

                    if ((parentAnswer < conditionalValue) && parentAnswer !== '') { 
                        testPassed = true; 
                    } else { checkIfConditionalQuestionsShouldRender(); } 
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