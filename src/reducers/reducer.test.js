import reduce from './index';


describe('clear_selected', () => {
    describe('when given a list of photos to clear', () => {
        it('clears the selected photos', () => {
            const initialState = { todos: [], photos: [], selected: ['id1','id2'], albums: [], waiting: false, errored: false, error: ''};
            const finalState = reduce(initialState, {
                type: 'CLEAR_SELECTED',
                payload: ''
            })
            expect(finalState.selected).toEqual([]);
        });
    });
});