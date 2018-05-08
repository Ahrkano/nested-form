import { setEmptyInputs, addInput, addSubInput, deleteInput, dataChange } from './actions';

describe('actionCreators tests', () => {
    test('setEmptyInputs should create action', () => {
        expect(setEmptyInputs(true, 0).type).toBe('SET_EMPTY_INPUTS_INFO');
        expect(setEmptyInputs(true, 0).areInputsFilled).toBe(true);
        expect(setEmptyInputs(true, 0).emptyInputs).toBe(0);
    });

    test('addInput should create action', () => {
        expect(addInput('random_id_12312asd').type).toBe('ADD_INPUT_HANDLER');
        expect(addInput('random_id_12312asd').questionId).toBe('random_id_12312asd');
    });

    test('addSubInput should create action', () => {
        expect(addSubInput('q_1', 'par_1', 'pLev_1', 'pTp_2').type).toBe('ADD_SUB_INPUT_HANDLER');
        expect(addSubInput('q_1', 'par_1', 'pLev_1', 'pTp_2').questionId).toBe('q_1');
        expect(addSubInput('q_1', 'par_1', 'pLev_1', 'pTp_2').parentId).toBe('par_1');
        expect(addSubInput('q_1', 'par_1', 'pLev_1', 'pTp_2').parentLevel).toBe('pLev_1');
        expect(addSubInput('q_1', 'par_1', 'pLev_1', 'pTp_2').parentType).toBe('pTp_2');
    });

    test('deleteInput should create action', () => {
        expect(deleteInput('chId_12', 'parId_22').type).toBe('DELETE_INPUT');
        expect(deleteInput('chId_12', 'parId_22').childId).toBe('chId_12');
        expect(deleteInput('chId_12', 'parId_22').parentId).toBe('parId_22');
    });

    test('dataChange should create action', () => {
        expect(dataChange('ev_1', 'q_2', 'inp_2').type).toBe('DATA_CHANGE');
        expect(dataChange('ev_1', 'q_2', 'inp_2').event).toBe('ev_1');
        expect(dataChange('ev_1', 'q_2', 'inp_2').questionId).toBe('q_2');
        expect(dataChange('ev_1', 'q_2', 'inp_2').inputType).toBe('inp_2');
    });
});
