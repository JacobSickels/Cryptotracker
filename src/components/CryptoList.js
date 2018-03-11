import React from 'react';
import { connect } from 'react-redux';
import selectCryptos from '../selectors/cryptos';
import { LineChart, Line } from 'recharts';

import CryptoItem from './CryptoItem';

export const CryptoList = (props) => (
        <div className="content-container">
            <CryptoItem crypto={props.cryptos.bitcoin} name='Bitcoin'/>
            <CryptoItem crypto={props.cryptos.litecoin} name='Litecoin'/> 
            <CryptoItem crypto={props.cryptos.ethereum} name='Ethereum'/>
        </div>
);

const mapStateToProps = (state) => {
    return {
        cryptos: selectCryptos(state.cryptos, state.filters)
    };
};

export default connect(mapStateToProps)(CryptoList);