/*
    This is the Authentication Data Reducer
    This deals with dispatch actions to auth section of Redux state.
*/

/*
    This function is the reducer
    action.type(s) come into the function, and the reducer updates the state accordingly

*/
export default (state = {}, action) => {
    switch(action.type) {
        //The LOGIN action.type updates the state to whatever the action.uid that is passed
        //This authenticates the user
        case 'LOGIN':
            return {
                uid: action.uid
            };
        //The LOGOUT action.type updates the state to empty, unauthenticating the user    
        case 'LOGOUT': 
            return {};
        //When action.type(s) aren't matched the current state is returned    
        default:
            return state;        
    }
};