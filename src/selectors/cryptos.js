import moment from 'moment';

//filtering crypto data by date ranges

export default (cryptos, {startDate, endDate}) => {
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
