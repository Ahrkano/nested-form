export const formObjectFiller = function(questionArray) {
    if (questionArray) {
        const formObject = {}
        // populating formObject with questionObjects
        questionArray.forEach(questionItem => {
            formObject[questionItem.id] = {
                conditionType: questionItem.condition === 'noCondition' ? 'root' : 'conditional',
                parentId: questionItem.parentId,
                question: questionItem.question,
                inputType: questionItem.type,
                answer: '',
                level: questionItem.anchorLevel,
                conditionalQuestions: {}
            }; 
        });

        questionArray.forEach(questionItem => {

            if (questionItem.condition !== 'noCondition') {
                formObject[questionItem.parentId].conditionalQuestions[questionItem.id] = {
                    type: questionItem.condition,
                    value: questionItem.conditionValue
                };
            }
        });

        return formObject;
    }
}

export const rootQuestionsOrderArray = function(questionArray) {
    if (questionArray) {
        const rootQuestionsOrder = [];

        questionArray.forEach(questionItem => {
            if(questionItem.parentId === 'rootNode') {
                rootQuestionsOrder.push(questionItem.id);
            }
        });

        return rootQuestionsOrder;
    }
}