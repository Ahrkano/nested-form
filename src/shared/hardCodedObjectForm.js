export const objectForm = {
    question_C1: {
        answer: "",
        conditionType: "conditional",
        conditionalQuestions: {},
        inputType: "yesNo",
        parentId: "question_C0",
        question: "Third's question subinput"
    },
    question_A0: {
        answer: "",
        conditionType: "root",
        conditionalQuestions: {
            question_A1: {type: "equals", value: "yes"}
        },
        inputType: "yesNo",
        parentId: "rootNode",
        question: "First root question: choose yes",
    },
    question_A2: {
        answer: "",
        conditionType: "conditional",
        conditionalQuestions: {},
        inputType: "yesNo",
        parentId: "question_A1",
        question: "Third question",
    },
    question_A1: {
        answer: "",
        conditionType: "conditional",
        conditionalQuestions: {
            question_A2: {type: "equals", value: "second"}
        },
        inputType: "text",
        parentId: "question_A0",
        question: "Second question: input 'second'"
    },
    question_C0: {
        answer: "",
        conditionType: "root",
        conditionalQuestions: {
            question_C1: {type: "equals", value: "4"}
        },
        inputType: "number",
        parentId: "rootNode",
        question: "Third root question: input '4'"
    },
    question_B0: {
        answer: "",
        conditionType: "root",
        conditionalQuestions: {},
        inputType: "yesNo",
        parentId: "rootNode",
        question: "Second root question",
    }
}

export const rootQuestionsOrder = ["question_A0", "question_B0", "question_C0"];