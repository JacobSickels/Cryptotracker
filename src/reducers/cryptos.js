/*
    This is the Cryptos Data Reducer
    This deals with dispatch actions to cryptos section of Redux state.
*/

// This is the default store state for all of the crypto data
const cryptosReducerDefaultState = {
    bitcoin: [],
    litecoin: [],
    ethereum: []
};

/*

    This function is the reducer
    action.type(s) come into the function, and the reducer updates the state accordingly

*/
export default (state = cryptosReducerDefaultState, action) => {

    switch(action.type) {
        //This updates state to action.cryptos
        case 'SET_CRYPTOS':
            return action.cryptos;
        //When there is no action, the current state is returned    
        default: return state;
    }

};