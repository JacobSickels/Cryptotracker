import React from 'react';
import { connect } from 'react-redux';
import { LineChart, Line } from 'recharts';
import { Route, Redirect } from 'react-router-dom';

import CryptoItem from './CryptoItem';
import CryptoFilter from './CryptoFilter';
import CryptoInfo from './CryptoInfo';

class SingleCrypto extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <CryptoFilter />
                <CryptoItem name={this.props.name} />
                <CryptoInfo name={this.props.name} />
            </div>
        );
    };


}

const mapStateToProps = (state, props) => {
    return {
        name: props.match.params.currency.charAt(0).toUpperCase() + props.match.params.currency.slice(1)
    };
};

export default connect(mapStateToProps)(SingleCrypto);