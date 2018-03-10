import React from 'react';
import { connect } from 'react-redux';
import selectCryptos from '../selectors/cryptos';
import { LineChart, Line } from 'recharts';

import CryptoListItem from './CryptoListItem';

export const CryptoList = (props) => (
        <div className="content-container">
            <CryptoListItem crypto={props.cryptos.bitcoin} name='Bitcoin'/>
            <CryptoListItem crypto={props.cryptos.litecoin} name='Litecoin'/> 
            <CryptoListItem crypto={props.cryptos.ethereum} name='Ethereum'/>
        </div>
);

const mapStateToProps = (state) => {
    return {
        cryptos: selectCryptos(state.cryptos, state.filters)
    };
};

export default connect(mapStateToProps)(CryptoList);