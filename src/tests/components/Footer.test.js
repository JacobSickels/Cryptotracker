import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../../components/Footer';

test('Should render footer correctly', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
});