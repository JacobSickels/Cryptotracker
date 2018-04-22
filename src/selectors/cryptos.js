import moment from 'moment';
import { convertToExchange } from './exchanges';

/*
    selectCryptos takes in an array of crypto data, and a filers object that contains a start and end date
    The array of crypto data is sorted greatest to least using the start and end date filters
*/
export const selectCryptos = (cryptos, {startDate, endDate}) => {
    
    //Creating a filtered object to store data
    const filteredCryptos = {
        bitcoin: [],
        litecoin: [],
        ethereum: []
    };
    
    //Looping through cryptos and storing them according to startDate and endDate
    for(var prop in cryptos) {
        filteredCryptos[prop] = cryptos[prop].filter((crypto) => {

            const createdAtMoment = moment(crypto.timestamp);
            const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
            const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;

            return startDateMatch && endDateMatch;
        });

        //filteredCrypto is sorted by (unix) timestamp
        filteredCryptos[prop].sort((a, b) => {
            return a.timestamp - b.timestamp;
        });

    }

    //Returning the filtered data
    return filteredCryptos;
};

/*
    getMaxMinData takes in a crypto data array, a filters object of start and end date, and a string crypto name
    The function is responsible for getting the data for determining when the best time to buy and sell a crypto
    during a period would be.
*/
export const getMaxMinData = (cryptos, filters, name) => {
    
    //Selecting the specific crypto with name
    let crypto = selectCryptos(cryptos, filters)[name];

    //Converting the crypto to the base currency of user from filters
    crypto = convertToExchange(filters.currency.exchange_rate, crypto);

    let maxDifference = 0;
    let minElement = {};
    let maxElement = {};

    //Loops through cryptos to get the range of max difference between two points
    for(var i = 0; i < crypto.length; i++) {
        for(var j = i + 1; j < crypto.length; j++) {
            let check = crypto[j].amount - crypto[i].amount;
            if(check > maxDifference) {
                    maxDifference = crypto[j].amount - crypto[i].amount;
                    minElement = crypto[i];
                    maxElement = crypto[j];
            }
        }
    }

    //Returning elements for min and max data as well as the maxDifference
    return { maxDifference: maxDifference.toFixed(2), minElement, maxElement }

}
