// Crypto Currency Data Reducer
// Deals with reducing dispatched actions

// This is the default store state for all of the crypto data
const cryptosReducerDefaultState = {
    bitcoin: [],
    litecoin: [],
    ethereum: []
};

export default (state = cryptosReducerDefaultState, action) => {

    switch(action.type) {
        case 'SET_CRYPTOS':
            return action.cryptos;
        default: return state;
    }

};