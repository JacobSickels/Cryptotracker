export default (exchanges) => {

    const filteredExchanges = exchanges.slice(0);

    filteredExchanges.sort((a, b) => {
        return a.name > b.name;
    });


    return filteredExchanges;
};
