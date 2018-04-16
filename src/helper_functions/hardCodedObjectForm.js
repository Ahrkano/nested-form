export const objectForm = {
    question_C1: {
        answer: "Answer for C1",
        conditionType: "conditional",
        conditionalQuestions: {},
        inputType: "yesNo",
        parentId: "question_C0",
        level: 2,
        question: "Third's question subinput"
    },
    question_A0: {
        // answer: "Answer for A0",
        answer: "Yes",
        conditionType: "root",
        conditionalQuestions: {
            question_A1: {type: "equals", value: "yes"}
        },
        inputType: "yesNo",
        parentId: "rootNode",
        level: 1,
        question: "First root question: choose yes",
    },
    question_A2: {
        answer: "Answer for A2",
        conditionType: "conditional",
        conditionalQuestions: {},
        inputType: "yesNo",
        parentId: "question_A1",
        level: 3,
        question: "Third question",
    },
    question_A1: {
        answer: "Answer for A1",
        conditionType: "conditional",
        conditionalQuestions: {
            question_A2: {type: "equals", value: "second"}
        },
        inputType: "text",
        parentId: "question_A0",
        level: 2,
        question: "Second question: input 'second'"
    },
    question_C0: {
        answer: "4",
        conditionType: "root",
        conditionalQuestions: {
            question_C1: {type: "equals", value: "4"}
        },
        inputType: "number",
        parentId: "rootNode",
        level: 1,
        question: "Third root question: input '4'"
    },
    question_B0: {
        answer: "Answer for B0",
        conditionType: "root",
        conditionalQuestions: {},
        inputType: "yesNo",
        parentId: "rootNode",
        level: 1,
        question: "Second root question",
    }
}

export const rootQuestionsOrder = ["question_A0", "question_B0", "question_C0"];