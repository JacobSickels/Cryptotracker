import moment from 'moment';

import {convertToExchange } from './exchanges';
//filtering crypto data by date ranges

export const selectCryptos = (cryptos, {startDate, endDate}) => {
    const filteredCryptos = {
        bitcoin: [],
        litecoin: [],
        ethereum: []
    };
    for(var prop in cryptos) {
        filteredCryptos[prop] = cryptos[prop].filter((crypto) => {
            //console.log('checking crypto object',crypto);
            const createdAtMoment = moment(crypto.timestamp);
            const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
            const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;

            return startDateMatch && endDateMatch;
        });

        //Fixes issue on Chrome
        filteredCryptos[prop].sort((a, b) => {
            return a.timestamp - b.timestamp;
        });

    }

    return filteredCryptos;
};


export const getMaxMinData = (cryptos, filters, name) => {
    let crypto = selectCryptos(cryptos, filters)[name];

    crypto = convertToExchange(filters.currency.exchange_rate, crypto);

    let maxDifference = 0;
    let minElement = {};
    let maxElement = {};

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

    return { maxDifference: maxDifference.toFixed(2), minElement, maxElement }

}
