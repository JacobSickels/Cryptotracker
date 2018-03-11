import React from 'react';
import { connect } from 'react-redux';
import selectCryptos from '../selectors/cryptos';
import { LineChart, Line } from 'recharts';

import CryptoItem from './CryptoItem';

class FilterCrypto extends React.Component {

    constructor(props) {
        super(props);
        let pick = [];
        

        this.state = {
        
          crypto: []     
        
        };

    }

    render() {
        return (
            <div>
                <CryptoItem crypto={this.props.crypto} name={this.props.name} />
            </div>
        );
    };


}

const mapStateToProps = (state, props) => {
    return {
        name: props.match.params.currency.charAt(0).toUpperCase() + props.match.params.currency.slice(1),
        crypto: selectCryptos(state.cryptos, state.filters)[props.match.params.currency]
    };
};

export default connect(mapStateToProps)(FilterCrypto);