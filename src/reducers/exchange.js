/*
    This is the Exchanges Data Reducer
    This deals with dispatch actions to exchanges section of Redux state.
*/

/*
    This function is the reducer
    action.type(s) come into the function, and the reducer updates the state accordingly

*/
export default (state = [], action) => {
    switch(action.type) {
        //The SET_EXCHANGE action obeject updates the state to the exchanges attached to the action
        case 'SET_EXCHANGE':
            return action.exchanges;
        //When there is no action, the current state is returned      
        default: return state;
    }
};