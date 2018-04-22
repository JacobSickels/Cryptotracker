import database from '../firebase/firebase';
import moment from 'moment';

//Creating a setCryptos action object for dispatching to Redux store
export const setCryptos = (cryptos) => ({
    type: 'SET_CRYPTOS',
    cryptos
});


/*

    startSetCryptos()
    This is a dispatching wrapper for the setCryptos action object
    This method goes to firebase, grabs the necessary cryptocurrency data, and loads an 
    object to be passed and dispatched to the Redux store.

*/

export const startSetCryptos = () => {
    return (dispatch) => {
        //Getting data from Firebase
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
                        //For each uuid key under 'bitcoin' get the value and push it to cryptos.bitcoin array
                        Object.keys(childSnapshot.val()).forEach(function(key) {
                            cryptos.bitcoin.push(childSnapshot.val()[key]);
                        });
                    }
                    else if(childSnapshot.key === 'litecoin') {
                        //For each uuid key under 'litecoin' get the value and push it to cryptos.litecoin array
                        Object.keys(childSnapshot.val()).forEach(function(key) {
                            cryptos.litecoin.push(childSnapshot.val()[key]);
                        });
                    }
                    else {
                        //For each uuid key under 'ethereum' get the value and push it to cryptos.ethereum array
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