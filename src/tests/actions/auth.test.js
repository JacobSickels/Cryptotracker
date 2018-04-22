import { login, logout } from '../../actions/auth';

//This test makes sure the login action object is created correctly
test('Should setup login action object', () => {
    const uid = '1234';
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});

//This test makes sure the logout action object is created correctly
test('Should setup logout action object', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});


