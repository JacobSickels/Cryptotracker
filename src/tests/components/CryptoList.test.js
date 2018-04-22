import React from 'react';
import { shallow } from 'enzyme';
import CryptoList from '../../components/CryptoList';

//This test makes sure that CryptoList is rendered correctly
test('Should render CryptoList correctly', () => {
    const wrapper = shallow(<CryptoList />);
    expect(wrapper).toMatchSnapshot();
});