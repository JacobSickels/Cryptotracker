const exchangeReducerDefaultState = [];

export default (state = exchangeReducerDefaultState, action) => {

    switch(action.type) {
        case 'SET_EXCHANGE':
            return action.exchanges;
        default: return state;
    }

};