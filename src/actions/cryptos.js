import database from '../firebase/firebase';
import moment from 'moment';


//setting timezone on account
export const setTimeZone = (timezone) => ({
    type: 'SET_TIMEZONE',
    timezone
});

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
                            //let data = childSnapshot.val()[key];
                            //console.log(moment(data.timestamp).tz('America/Chicago').format());
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