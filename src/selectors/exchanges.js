export default (exchanges) => {

    const filteredExchanges = exchanges.slice(0);

    filteredExchanges.sort((a, b) => {
        return a.name > b.name;
    });


    return filteredExchanges;
};


export const convertToExchange = (exchangeRate, cryptos) => {
    const converted = cryptos.map((entry) => ({
        amount: (parseFloat(entry.amount) * exchangeRate).toFixed(2),
        timestamp: entry.timestamp
    }));

    return converted;
}