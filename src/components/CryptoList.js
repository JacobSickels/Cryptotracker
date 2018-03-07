import React from 'react';
import { connect } from 'react-redux';
import selectCryptos from '../selectors/cryptos';

import CryptoListItem from './CryptoListItem';

export const CryptoList = (props) => (
    <div> 
        <h2>CryptoList</h2> 
        Bitcoin:
        <CryptoListItem crypto={props.cryptos.bitcoin} />
        Litecoin:
        <CryptoListItem crypto={props.cryptos.litecoin} /> 
        Ethereum:
        <CryptoListItem crypto={props.cryptos.ethereum} />
    </div>
);

const mapStateToProps = (state) => {
    return {
        cryptos: selectCryptos(state.cryptos, state.filters)
    };
};

export default connect(mapStateToProps)(CryptoList);