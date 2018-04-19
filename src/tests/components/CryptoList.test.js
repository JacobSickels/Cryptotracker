import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import CryptoList from '../../components/CryptoList';

test('Should render CryptoList correctly', () => {
    const wrapper = shallow(<CryptoList />);
    expect(wrapper).toMatchSnapshot();
});