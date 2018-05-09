import React from 'react';
import renderer from 'react-test-renderer';
import InputBox from './InputBox';
import { formObjectInstance, rootQuestionOrderInstance } from '../../shared/sampleValues';

const questionId = rootQuestionOrderInstance[0];

describe('InputBox snapshot', () => {
    test('InputBox snapshot test', () => {
        const component = renderer.create(
            <InputBox
                key={questionId}
                id={questionId}
                question={formObjectInstance[questionId].question}
                inputType={formObjectInstance[questionId].inputType}
                value={formObjectInstance[questionId].answer}
                level={formObjectInstance[questionId].level}
                onInputChange={() => {}}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
