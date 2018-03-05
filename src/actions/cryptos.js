import database from '../firebase/firebase';

// SET_CRYPTOS
export const setCryptos = (cryptos) => ({
    type: 'SET_CRYPTOS',
    cryptos
});


// SET_START_CRYPTOS
// This is a dispatching wrapper for the setCryptos action object
// This method goes to firebase, grabs the necessary data, and loads an object to be passed and dispatched to the redux store.

export const startSetCryptos = () => {
    return (dispatch) => {
        return database.ref('crypto_data')
            .once('value')
            .then((snapshot) => {

                // Creating an object to load Firebase data into
                const cryptos = {
                    bitcoin: [],
                    litecoin: [],
                    ethereum: []
                };

                // Looping through Firebase data and loading the object
                snapshot.forEach((childSnapshot) => {
                    
                    if(childSnapshot.key === 'bitcoin') {
                        Object.keys(childSnapshot.val()).forEach(function(key) {
                            cryptos.bitcoin.push(childSnapshot.val()[key]);
                        });
                    }
                    else if(childSnapshot.key === 'litecoin') {
                        Object.keys(childSnapshot.val()).forEach(function(key) {
                            cryptos.litecoin.push(childSnapshot.val()[key]);
                        });
                    }
                    else {
                        Object.keys(childSnapshot.val()).forEach(function(key) {
                            cryptos.ethereum.push(childSnapshot.val()[key]);
                        });
                    }

                });

                // Dispatching object to the Redux store.
                dispatch(setCryptos(cryptos));

            });
    };
}