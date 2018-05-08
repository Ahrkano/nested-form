import { returnFormJSX } from './services';

describe('previewTab services tests', () => {
    test("returnFromJSX() should return null if parameters are 'null' or 'undefined'", () => {
        expect(returnFormJSX(null, null, null)).toEqual(null);
        expect(returnFormJSX(null, 'value', null)).toEqual(null);
        expect(returnFormJSX('value', null, null)).toEqual(null);
        expect(returnFormJSX(undefined, undefined, undefined)).toEqual(null);
        expect(returnFormJSX(undefined, 'value', undefined)).toEqual(null);
        expect(returnFormJSX('value', undefined, undefined)).toEqual(null);
    });
});
