export const formObjectRenderingArray = function(state, rootQuestionsOrder) {
    const questionsRenderArray = [];
    
    const checkIfConditionalQuestionsShouldRender = function() {
        const reversedQuestionsArray = [ ...questionsRenderArray ].reverse();
        let shouldCallRecursively = [];

        reversedQuestionsArray.forEach(id => {
            const parentId = state[id].parentId;
            if ( parentId !== 'rootNode' && reversedQuestionsArray.indexOf(parentId) < 0 ) { 
                state[parentId].answer = '';
                
                const questionIndex = questionsRenderArray.indexOf(id);
                questionsRenderArray.splice(questionIndex, 1);
                
                shouldCallRecursively.push(false);
            } else {
                shouldCallRecursively.push(true);
            }
        });

        // reduce shouldCallRecursively to one value
        shouldCallRecursively = shouldCallRecursively.reduce((conjunction, boolean) => { 
            return conjunction && boolean;
        }, true);

        // recursive call if there was at least one element to remove from array
        if (!shouldCallRecursively) { checkIfConditionalQuestionsShouldRender(); }
    }

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

                if (parentAnswer === conditionalValue && parentAnswer !== '') { testPassed = true; } 

            } else if (conditionType === 'greater') {
                if(parentAnswer !== '') { parentAnswer = Number(parentAnswer); }
                conditionalValue = Number(conditionalValue);

                if ((parentAnswer > conditionalValue) && parentAnswer !== '') { testPassed = true; } 

            } else if (conditionType === 'less') {
                if(parentAnswer !== '') { parentAnswer = Number(parentAnswer); }
                conditionalValue = Number(conditionalValue);

                if ((parentAnswer < conditionalValue) && parentAnswer !== '') { testPassed = true; } 
            }
        }

        if(testPassed) { questionsRenderArray.push(questionId); }

        if (Object.keys(state[questionId].conditionalQuestions)[0]) {
            for(let key in state[questionId].conditionalQuestions) { questionRecursiveCall(key); }
        }
    }
    
    rootQuestionsOrder.forEach(rootQuestion => { questionRecursiveCall(rootQuestion); });
    
    checkIfConditionalQuestionsShouldRender();

    return questionsRenderArray;
}