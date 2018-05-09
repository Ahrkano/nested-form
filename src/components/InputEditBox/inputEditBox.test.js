import React from 'react';
import renderer from 'react-test-renderer';
import InputEditBox from './InputEditBox';
import { formObjectInstance, rootQuestionOrderInstance } from '../../shared/sampleValues';

const questionId = rootQuestionOrderInstance[0];

describe('InputEditBox snapshot', () => {
    test('InputEditBox snapshot test', () => {
        const component = renderer.create(
            <InputEditBox
                key={questionId}
                id={questionId}
                value={formObjectInstance[questionId].question}
                type={formObjectInstance[questionId].inputType}
                parentType={formObjectInstance[questionId].parentType}
                condition={formObjectInstance[questionId].condition}
                conditionValue={formObjectInstance[questionId].conditionValue}
                level={formObjectInstance[questionId].level}
                parent={formObjectInstance[questionId].parentId}
                onInputChange={() => {}}
                onSubInputAddition={() => {}}
                onInputDeletion={() => {}}
            />
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
