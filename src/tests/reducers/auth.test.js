import authReducer from '../../reducers/auth';

//This test makes sure the authReducer sets the uid in Redux on login
test('Should set uid for login', () => {
    const action = {
        type: 'LOGIN',
        uid: 'abc123'
    };
    const state = authReducer({}, action);
    expect(state.uid).toBe(action.uid);
});

//This test makes sure the authReducer clears the uid in Redux on logout
test('Should clear uid for logout', () => {
    const action = {
        type: 'LOGOUT'
    };
    const state = authReducer({ uid: 'anything' }, action);
    expect(state).toEqual({});
});