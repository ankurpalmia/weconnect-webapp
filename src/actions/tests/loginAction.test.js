import { loginAction } from '../loginAction';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { LOGIN_SUCCESS, LOGIN_FAIL } from '../../constants';

const mockStore = configureMockStore([thunk]);

const testStore = mockStore({
    login: {
        error: null,
        token: null,
        userDetails: null
    }
});

jest.mock("../../services/loginPost");

import { loginPost } from '../../services/loginPost';

describe('Testing Login Action', () => {

    beforeEach(() =>
        moxios.install()
    );

    afterEach(() =>
        moxios.uninstall()
    );

    const user = {
        username: "example",
        password: "password"
    }

    it("Checking the LOGIN_SUCCESS action", done => {
        loginPost.mockReturnValueOnce(
            Promise.resolve({
                data: user
            })
        );
        const expectedActions = [
            {
                type: LOGIN_SUCCESS
            }
        ];
        testStore.dispatch(loginAction("test"))
            .then(() => {
                expect(testStore.getActions()).toEqual(expectedActions);
            });
        done();
    });

    it("Checking the LOGIN_FAIL action", done => {
        loginPost.mockReturnValueOnce(
            Promise.reject({
                response: {
                    data: {
                        email: "User invalid"
                    }
                }
            })
        );
        const expectedActions = [
            {
                type: LOGIN_FAIL,
                payload: "User invalid"
            }
        ];
        testStore.dispatch(loginAction("test"))
            .then(() => {
                expect(testStore.getActions()).toEqual(expectedActions);
            });
        done();
    });
});
