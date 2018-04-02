import React from 'react';
import { connect } from 'react-redux';
import { Row, Input, Col, Icon } from 'react-materialize';
import { startSetExchange } from '../actions/exchange';

import LoadingPage from './LoadingPage';

/*

need to load from and to elements into default state.


*/

export class ExchangePage extends React.Component {
    constructor(props) {
        super(props);
        const from = (this.props.from_element) ? this.props.from_element : null;
        const to = (this.props.to_element) ? this.props.to_element : null;
        this.state = {
            componentMounted: false,
            amount: 1,
            from_element: from,
            to_element: to,
            conversion: (amount) => {
                if(this.state.from_element === null) {
                    this.setState({ from_element: this.props.from_element });
                    this.setState({ to_element: this.props.to_element });
                }
                let conv = (this.state.from_element) ? (amount / this.state.from_element.exchange_rate) * this.state.to_element.exchange_rate : 0;
                return conv.toFixed(2);
            }

        }

        this.props.startSetExchange();
    }

    onToInputChange = (e) => {
        const target = this.props.exchanges.find((element) => element.id === e.target.value);
        console.log(e.target.value);
        this.setState({to_element: target});
    }

    onFromInputChange = (e) => {
        const target = this.props.exchanges.find((element) => element.id === e.target.value);
        console.log(e.target.value);
        this.setState({from_element: target});
    }

    onAmountChange = (e) => {
        let amount = e.target.value;
        if(!amount || isNaN(amount)) {
            amount = 1;
        }
        this.setState({ amount });
    }
    
    componentDidMount() {
        this.setState({componentMounted: true});
        console.log('mounted');
        console.log(this.props);
    }
    
    render() {
        
        if(!this.state.componentMounted || this.state.from_element === null || this.state.conversion(this.state.amount) === 0) {
            console.log('mounted', this.state.componentMounted);
            console.log('from', this.state.from_element);
            console.log('');
            return <LoadingPage />
        }

        return (
            <div className="page-container">
                <div className="exchange-display">
                    <div className="container"> 
                        <h1> {this.state.amount} {this.state.from_element.name}</h1>
                        <h1> {this.state.conversion(this.state.amount)} {this.state.to_element.name}</h1>
                    </div>
                </div>
                <div className="container exchange">
                    <Row className="selector">
                        <Input s={5} label="Input Amount" defaultValue='1' onChange={this.onAmountChange} />
                    </Row>
                    <Row className="selector">
                        <Input s={5} type='select' label="Select Currency" value={this.state.from_element.id} onChange={this.onFromInputChange}>
                            {
                                this.props.exchanges.map((currency) =>
                                    <option key={currency.id} value={currency.id}>{currency.name}</option>
                                )
                            }
                        </Input>
                        <Col s={2} className="arrow">
                            <Icon medium>arrow_forward</Icon>
                        </Col>
                        <Input s={5} type='select' label="Select Currency" value={this.state.to_element.id} onChange={this.onToInputChange}>
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

const mapDispatchToProps = (dispatch) => {
    return {
        startSetExchange: () => dispatch(startSetExchange())
    };
};

const mapStateToProps = (state, props) => {
    console.log('mapping state');
    return {
        exchanges: state.exchange,
        from_element: state.exchange.find((element) => element.id == 'BTC'),
        to_element: state.exchange.find((element) => element.id == 'USD')
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExchangePage);

