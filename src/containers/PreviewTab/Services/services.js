import React from 'react';
import InputBox from '../../../components/InputBox/InputBox';

import { formObjectRenderingArray } from '../../../helper_functions/formObjectRenderingArray';

export const returnFormJSX = function(state, rootQuestionsOrder, onInputChangeHandler) {
    if (state && rootQuestionsOrder) {
        const questionsRenderArray = formObjectRenderingArray(state, rootQuestionsOrder);

        return questionsRenderArray.map(questionId => {
            return (
                <InputBox
                    key={questionId}
                    id={questionId}
                    question={state[questionId].question}
                    inputType={state[questionId].inputType}
                    value={state[questionId].answer}
                    level={state[questionId].level}
                    onInputChange={onInputChangeHandler}
                />
            );
        });
    } else {
        return null;
    }
};
