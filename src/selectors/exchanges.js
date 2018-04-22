/*
    This is the sortExchanges method used in other Components
    This function is reponsible for sorting the exchange data alphabnetically
*/
export default (exchanges) => {

    //Copying exchanges array to temp array for manipulating
    const filteredExchanges = exchanges.slice(0);

    //Sorting filteredExchanges by name
    filteredExchanges.sort((a, b) => {
        if(a.name > b.name)
            return 1;
        else if( b.name > a.name)
            return -1;
        else   return 0;        
    });

    //Returning filteredExchanges array
    return filteredExchanges;
};

/*
    convertToExchange is responsible for converting an array of cryptocurrency
    data to the exchangeRate that is passed in.
*/
export const convertToExchange = (exchangeRate, cryptos) => {

    //Map function going through each object in cryptos array and converting it to the exchange rate
    const converted = cryptos.map((entry) => ({
        amount: (parseFloat(entry.amount) * exchangeRate).toFixed(2),
        timestamp: entry.timestamp
    }));

    //Returning converted cryptocurrency array
    return converted;
}