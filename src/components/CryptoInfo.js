import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Col } from 'react-materialize';

import selectCryptos from '../selectors/cryptos';

export class CryptoInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            maxDifference: () => {
                const crypto = props.data;
    
                let maxDifference = 0;
                let minElement = crypto[0].amount;
                
                for(var i = 1; i < crypto.length; i++) {
                    if(crypto[i].amount - minElement > maxDifference) {
                        maxDifference = crypto[i].amount - minElement;
                    }
                    if(crypto[i] < minElement) {
                        minElement = crypto[i].amount;
                    }
                }
                return maxDifference.toFixed(2);
            }
        }
    }

    componentWillMount() {
        console.log('testing');
    }

    render() {
        return (
            <div className="chart-info">
                <div className="container">
                    <Row> 
                        <Col s={12} m={4} l={4}>
                            <h1> Max Increase </h1>
                            {this.props.maxDifference}
                        </Col>
                        <Col s={12} m={4} l={4}>
                            <h1>Time To Buy</h1> 
                            <em>{moment(this.props.minElement.timestamp).format('ha MMM Do YYYY')}</em>
                            <p>{this.props.minElement.amount}</p>
                        </Col>
                        <Col s={12} m={4} l={4}>
                            <h1>Time To Sell</h1>
                            <em>{moment(this.props.maxElement.timestamp).format('ha MMM Do YYYY')}</em>
                            <p>{this.props.maxElement.amount}</p>
                        </Col>                </Row>
                </div>
            </div>
        );
    }

}

const getMaxMinData = (cryptos, filters, name) => {
    const crypto = selectCryptos(cryptos, filters)[name];
    console.log('new data');

    let maxDifference = 0;
    let minElement = {};
    let maxElement = {};

    for(var i = 0; i < crypto.length; i++) {
        for(var j = i + 1; j < crypto.length; j++) {
            let check = crypto[j].amount - crypto[i].amount;
            if(check > maxDifference) {
                    maxDifference = crypto[j].amount - crypto[i].amount;
                    minElement = crypto[i];
                    maxElement = crypto[j];
            }
        }
    }

    return { maxDifference: maxDifference.toFixed(2), minElement, maxElement }

}

const mapStateToProps = (state, props) => {
    
    const data = getMaxMinData(state.cryptos, state.filters, props.name.toLowerCase());
    
    return { ...data }

};

export default connect(mapStateToProps)(CryptoInfo);