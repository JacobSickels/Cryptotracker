import React from 'react';
import selectCryptos from '../selectors/cryptos';
import { LineChart, Line } from 'recharts';

import CryptoItem from './CryptoItem';

const CryptoList = (props) => (
        <div>
            <CryptoItem name='Bitcoin'/>
            <CryptoItem name='Litecoin'/> 
            <CryptoItem name='Ethereum'/>
        </div>
);

export default CryptoList;