import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/Footer';

//This test makes sure the Footer component is rendered correctly
test('Should render footer correctly', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
});