import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import LoadingPage from '../../components/LoadingPage';

test('should render LoadingPage correctly', () => {
    const createMockStore = configureMockStore([thunk]);
    const store = createMockStore();
    const wrapper = shallow(<Provider store={store}><LoadingPage /></Provider> );
    expect(wrapper).toMatchSnapshot();
});