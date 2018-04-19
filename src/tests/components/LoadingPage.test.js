import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import LoadingPage from '../../components/LoadingPage';

test('Should render LoadingPage correctly', () => {
    const createMockStore = configureMockStore([thunk]);
    const store = createMockStore();
    const wrapper = shallow(<LoadingPage store={store}/>);
    expect(wrapper).toMatchSnapshot();
});