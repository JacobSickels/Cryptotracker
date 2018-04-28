import React from 'react';
import { connect } from 'react-redux';
import { Row, Input, Col, Icon } from 'react-materialize';
import sortExchanges from '../selectors/exchanges';

/*
    ExchangePage is a React Component responsible for allowing the user to check exchange rates

    ExchangePage contains two dropdowns and an input field that allow the user to check exchange
    rates for many different types of currencies, including the cryptocurrencies from the application
*/

export class ExchangePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            amount: 1, //Amount entered in field
            from_element: this.props.from_element, //Base Currency
            to_element: this.props.to_element, //Conversion Currency
            conversion: (amount) => {
                //This function converts the amount to the conversion currency
                let conv = (this.state.from_element) ? (amount / this.state.from_element.exchange_rate) * this.state.to_element.exchange_rate : 0;
                //Floating point numbers give weird error when inputs are the same value, value should be equal to amount 
                if(this.state.from_element.id === this.state.to_element.id){
                    conv = parseFloat(amount);
                }
                return conv.toFixed(2);
            }

        }
    }

    //Called when the Conversion currency dropdown is changed
    onToInputChange = (e) => {
        const target = this.props.exchanges.find((element) => element.id === e.target.value);
        this.setState({to_element: target});
    }

    //Called when the Base currency dropdown is changed
    onFromInputChange = (e) => {
        const target = this.props.exchanges.find((element) => element.id === e.target.value);
        this.setState({from_element: target});
    }

    //Called when the Amount field is changed
    onAmountChange = (e) => {
        let amount = e.target.value;
        if(!amount || amount.match(/^\d{1,10}(\.\d{0,2})?$/)){
            this.setState(()=> ({ amount }));
        }
    }
    
    render() {
        return (
            <div className="page-container">
                <div className="exchange-display">
                    <div className="container"> 
                        <h3> {(this.state.amount) ? this.state.amount : 0} {this.state.from_element.name}</h3>
                        <h3> {this.state.conversion(this.state.amount)} {this.state.to_element.name}</h3>
                    </div>
                </div>
                <div className="container exchange">
                    <Row className="selector">
                        <Col s={5}>
                            <input 
                                type="text"
                                placeholder="Amount"
                                value={this.state.amount}
                                onChange={this.onAmountChange}
                            />
                        </Col>
                        <Col s={2} className="arrow">
                            <Icon medium>arrow_forward</Icon>
                        </Col>
                        <div s={5}>
                            <h3>{this.state.conversion(this.state.amount)}</h3>
                        </div>
                    </Row>
                    <Row className="selector">
                        <Input s={5} id="base-currency" type='select' value={this.state.from_element.id} onChange={this.onFromInputChange}>
                            {
                                this.props.exchanges.map((currency) =>
                                    <option key={currency.id} value={currency.id}>{currency.name}</option>
                                )
                            }
                        </Input>
                        <Col s={2} className="arrow">
                            <Icon medium>arrow_forward</Icon>
                        </Col>
                        <Input s={5} id="conversion-currency" type='select' value={this.state.to_element.id} onChange={this.onToInputChange}>
                            {
                                this.props.exchanges.map((currency) =>
                                    <option key={currency.id} value={currency.id}>{currency.name}</option>
                                )
                            }
                        </Input>
                    </Row>
                </div>
            </div>
        );
    }
}

/*
    This function maps Redux state to props that are passed into the component
    
    This function takes the exchange Redux state object and sorts it alphabetically.
    It also takes two default exchange objects and passes them to props as well as the
    sorted exchange Redux data to be used in the dropdowns.
*/
const mapStateToProps = (state, props) => {
    
    //Sorting the dropdowns alphabetically
    const sortedExchange = sortExchanges(state.exchange);

    //Base currency to convert from
    const BTC_EXCHANGE = {
        "exchange_rate": "0.00011300",
        "id": "BTC",
        "name": "Bitcoin",
        "symbol": "BTC"
    };

    //Conversion currency to convert to
    const USD_EXCHANGE = {
        "exchange_rate": "1.00",
        "id": "USD",
        "name": "United States Dollar",
        "symbol": "$"
    };

    return {
        exchanges: sortedExchange,
        from_element: BTC_EXCHANGE,
        to_element: USD_EXCHANGE
    };
};

//This creates a Higher Order Component letting the component access the Redux state
export default connect(mapStateToProps)(ExchangePage);

