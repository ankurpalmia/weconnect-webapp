import React from 'react';
import { mount } from 'enzyme';
import { Login } from './index';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

const testStore = mockStore({
    login: {
        error: null,
        token: null,
        userDetails: null
    }
});

let onSubmitMock = jest.fn();

const setUp = (props) => {
    return mount(
        <Provider store={testStore}>
            <BrowserRouter>
                <Login {...props} />
            </BrowserRouter>
        </Provider>
    )
};

describe('Testing onSubmit', () => {
    let user = {
        username: "example",
        password: "password",
    };

    const props = {
        loginAction: onSubmitMock,
        clearLoginError: jest.fn(),
        loadUser: jest.fn()
    };

    it('Testing if the action is being called', () => {
        let wrapper = setUp(props);
        const button = wrapper.find('Button[type="submit"]');
        button.simulate('click');
        expect(onSubmitMock).toBeCalled;
    });

    it('Should get proper arguments', () => {
        let wrapper = setUp(props);

        wrapper.update();

        wrapper.find('input[name="username"]').simulate('change', { target: { name: 'username', value: 'example' } });
        wrapper.find('input[name="password"]').simulate('change', { target: { name: 'password', value: 'password' } });
        
        const button = wrapper.find('Button[type="submit"]');

        button.simulate('submit');
        expect(onSubmitMock).toHaveBeenCalledWith(user);
    });

});
