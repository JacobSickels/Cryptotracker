import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

import { setStartDate, setEndDate } from '../actions/filters';

export class CryptoFilter extends React.Component {

    state = {
        calendarFocused: null
    };

    onDatesChange = ({ startDate, endDate }) => {
        
        if(!startDate && !endDate) {
            this.props.setStartDate(moment().startOf('day'));
            this.props.setEndDate(moment().endOf('day'));
        }
        else {
            this.props.setStartDate(startDate);
            this.props.setEndDate(endDate);
        }
    }

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    }

    render() {
        return (
            <div className="date-container">
                <div className="container">
                    <DateRangePicker 
                        startDate={this.props.filters.startDate}
                        endDate={this.props.filters.endDate}
                        onDatesChange={this.onDatesChange}
                        focusedInput={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        minimumNights={0}
                        showClearDates={true}
                        isOutsideRange={(day) => {
                            const today = moment();
                            return day.isAfter(today) || day.isBefore("2018-03-01");
                        }}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(CryptoFilter);