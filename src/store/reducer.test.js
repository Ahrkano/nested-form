import Reducer from './reducer';

const reducerInstance = Reducer(undefined, {});

describe('reducer tests', () => {
    test('reducer should return the initial state', () => {
        expect(reducerInstance).toEqual({
            allQuestionsOrder: null,
            rootQuestionsOrder: null,
            formObject: null
        });
    });
});
