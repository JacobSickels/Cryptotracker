import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

//This test makes sure the Header component is rendered correctly
test('Should render Header correctly', () => {
    const wrapper = shallow(<Header startLogout={() => {}} />); 
    expect(wrapper).toMatchSnapshot();
});

//This test makes sure the startLogout action is called on Logout button click in Header
test('Use Case #7.0: Should call startLogout on button click', () => {
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout} />);
    wrapper.find('#logout').simulate('click');
    expect(startLogout).toHaveBeenCalled();
});
