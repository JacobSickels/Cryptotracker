import React from 'react';
import { connect } from 'react-redux';
import CryptoItem from './CryptoItem';
import CryptoFilter from './CryptoFilter';
import CryptoInfo from './CryptoInfo';

/*
    SingleCrypto is a React Component responsible for showing the contents
    of the Filtering page for a specific cryptocurrency. SingleCrypto shows
    a CryptoFilter component, CryptoItem component, and a CryptoInfo component
    for a specific crypto.

    This page is navigated to whenever a /filter/:curreny is matched in AppRouter.

    The currency to show is retreived from the props in mapStateToProps.
*/

export class SingleCrypto extends React.Component {

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

/*
    This function maps Redux state to props that are passed into the component
    
    This function gets the name of the currency matched from AppRouter and gets 
    the matched currency parameter and passes it as props to SingleCrypto. This
    name prop is passed to CryptoItem and CryptoInfo for use in themselves.
*/
const mapStateToProps = (state, props) => {
    return {
        name: props.match.params.currency.charAt(0).toUpperCase() + props.match.params.currency.slice(1)
    };
};

//This creates a Higher Order Component letting the component access the Redux state
export default connect(mapStateToProps)(SingleCrypto);