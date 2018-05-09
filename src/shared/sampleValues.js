export const formObjectInstance = {
    question_8cbc0838: {
        conditionType: 'root',
        condition: 'noCondition',
        conditionValue: 'noCondition',
        parentId: 'rootNode',
        parentType: 'root',
        question: 'Write good',
        inputType: 'text',
        answer: '',
        level: 1,
        conditionalQuestions: {
            question_9a7475a1: {
                type: 'equals',
                value: 'good'
            }
        }
    },
    question_9a7475a1: {
        conditionType: 'conditional',
        condition: 'equals',
        conditionValue: 'good',
        parentId: 'question_8cbc0838',
        parentType: 'text',
        question: 'Click yes',
        inputType: 'yesNo',
        answer: '',
        level: 2,
        conditionalQuestions: {}
    },
    question_3ad9522f: {
        conditionType: 'root',
        condition: 'noCondition',
        conditionValue: 'noCondition',
        parentId: 'rootNode',
        parentType: 'root',
        question: 'Some question',
        inputType: 'yesNo',
        answer: '',
        level: 1,
        conditionalQuestions: {}
    }
};

export const rootQuestionOrderInstance = ['question_8cbc0838', 'question_3ad9522f'];
