import React from 'react';
import { shallow } from 'enzyme';
import { SingleCrypto } from '../../components/SingleCrypto';

//This test makes sure the SingleCrypto component is rendered correctly
test('Should render SingleCrypto page correctly', () => {
    const wrapper = shallow(<SingleCrypto name="bitcoin"/>);
    expect(wrapper).toMatchSnapshot();
});

