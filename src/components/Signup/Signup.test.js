import React from 'react';
import { mount } from 'enzyme';
import { Signup } from './index';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

const testStore = mockStore({
    signup: {
        emailError: null,
        usernameError: null,
        error: null
    }
});

let onSubmitMock = jest.fn();

const setUp = (props) => {
    return mount(
        <Provider store={testStore}>
            <BrowserRouter>
                <Signup {...props} />
            </BrowserRouter>
        </Provider>
    )
};

describe('Testing onSubmit', () => {
    let user = {
        email: "example@gmail.com",
        username: "example",
        first_name: "First",
        last_name: "Last",
        password: "password",
        date_of_birth: "2020/03/26",
        gender: "M"
    };

    const props = {
        signupAction: onSubmitMock,
        clearSignupError: jest.fn()
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

        wrapper.find('input[name="firstName"]').simulate('change', { target: { name: 'firstName', value: 'First' } });
        wrapper.find('input[name="lastName"]').simulate('change', { target: { name: 'lastName', value: 'Last' } });
        wrapper.find('input[name="email"]').simulate('change', { target: { name: 'email', value: 'example@gmail.com' } });
        wrapper.find('input[name="username"]').simulate('change', { target: { name: 'username', value: 'example' } });
        wrapper.find('input[name="password"]').simulate('change', { target: { name: 'password', value: 'password' } });
        wrapper.find('input[name="confirmPassword"]').simulate('change', { target: { name: 'confirmPassword', value: 'password' } });
        wrapper.find('input[name="gender"]').simulate('change', { target: { name: 'gender', value: 'M' } });
        wrapper.find('input[name="dob"]').simulate('change', { target: { name: 'dob', value: '2020/03/26' } });

        const button = wrapper.find('Button[type="submit"]');

        button.simulate('submit');
        expect(onSubmitMock).toHaveBeenCalledWith(user);
    });

});
