import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'react-materialize';
import { startEditCurrency } from '../actions/filters';
import sortExchanges from '../selectors/exchanges';

/*
    AccountPage is a React Component that contains the functionality on the Account Page

    This component contains a dropdown for updating the User's base currency
*/

export class AccountPage extends React.Component {

    constructor(props) {
        super(props);
        
        //Component state for updating the dropdown when it is clicked
        this.state = {
            currency: props.currency
        }

    }

    //This function is called when the dropdown is changed
    changeBaseCurrency = (e) => {
        //Finding currency object with same id from exchanges array
        const currency = this.props.exchanges.find((element) => {
            if(element.id === e.target.value){
                return element;
            }
        });
        //Updating component state to chosen currency
        this.setState({ currency });
        //Updating Redux state with chosen currency
        this.props.startEditCurrency(currency);
    }

    //Render function renders the components to the screen
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
                        <Input s={5} type='select' value={this.state.currency.id} onChange={this.changeBaseCurrency}>
                            {
                                //Inline that function loads all the currency data into the dropdown as options
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

/*
    This function maps Redux state to props that are passed into the component
    
    This function passes sorted exchange data from Redux state, and the current
    base currency in the filters data from Redux state to the component.
*/
const mapStateToProps = (state, props) => {

    const sortedExchange = sortExchanges(state.exchange);
    return {
        exchanges: sortedExchange,
        currency: state.filters.currency
    };
};

/*
    This function takes Redux dispatch actions and maps them to a function
    This new function is passed as a property in the component and is called in changeBaseCurrency
*/
const mapDispatchToProps = (dispatch) => {
    return {
        startEditCurrency: (currency) => dispatch(startEditCurrency(currency))
    };
};

//This creates a Higher Order Component letting the component access the Redux state and dispatch actions
export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);