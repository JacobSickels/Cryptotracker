import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import DashboardPage from '../../components/DashboardPage';


test('should render dashboard page correctly', () => {
    const createMockStore = configureMockStore([thunk]);
    const store = createMockStore();
    const wrapper = shallow(
            <DashboardPage store={store}/>
        );
    expect(wrapper.dive()).toMatchSnapshot();
})