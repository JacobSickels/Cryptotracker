import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Col } from 'react-materialize';
import { getMaxMinData } from '../selectors/cryptos';

/*
    CryptoInfo is a React Component that contains information on when it 
    was the best time to buy and sell during the filtering period.
*/

export class CryptoInfo extends React.Component {

    constructor(props) {
        super(props);
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
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

}

/*

    This function maps Redux state to props that are passed into the component
    
    This function relies on the getMaxMinData function that resides in selectors/cryptos
    The data is seperated into a object and the key values from the object are passed as props

*/
const mapStateToProps = (state, props) => {
    const data = getMaxMinData(state.cryptos, state.filters, props.name.toLowerCase());
    return { ...data }
};
//This creates a Higher Order Component letting the component access the Redux state
export default connect(mapStateToProps)(CryptoInfo);