import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'react-materialize';

import { startEditCurrency } from '../actions/filters';
import sortExchanges from '../selectors/exchanges';

export class AccountPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currency: props.currency
        }

    }

    onInputChange = (e) => {
        const currency = this.props.exchanges.find((element) => {
            if(element.id === e.target.value){
                return element;
            }
        });
        this.setState({ currency });
        this.props.startEditCurrency(currency);
    }

    render() {
        return (
            <div className="page-container">
                <div className="account__title">
                    <div className="container">
                        <div className="account__title">
                            <h1>My Account Page</h1>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="account__option">
                        <h2>Set Base Currency</h2>
                        <Input s={5} type='select' value={this.state.currency.id} onChange={this.onInputChange}>
                            {
                                this.props.exchanges.map((currency) =>
                                    <option key={currency.id} value={currency.id}>{currency.name}</option>
                                )
                            }
                        </Input>
                    </div>
                </div>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        startEditCurrency: (currency) => dispatch(startEditCurrency(currency))
    };
};

const mapStateToProps = (state, props) => {

    const sortedExchange = sortExchanges(state.exchange);
    return {
        exchanges: sortedExchange,
        currency: state.filters.currency
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);