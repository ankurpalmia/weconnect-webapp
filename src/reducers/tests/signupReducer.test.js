import { signupReducer } from '../signupReducer';
import { SIGNUP_SUCCESS, SIGNUP_EMAIL_ERROR, SIGNUP_USERNAME_ERROR } from '../../constants';

describe('SignUp Reducer', () => {

    const initialState = {
        emailError: null,
        usernameError: null,
        error: null
    };

    it('Should return default state', () => {
        const newState = signupReducer(undefined, {});
        expect(newState).toEqual(initialState);
    });

    describe('Should return new state if passing type', () => {

        it('Passing user state', () => {

            const reqState = {
                "emailError": null,
                "error": false,
                "usernameError": null
            }

            const newState = signupReducer(undefined, {
                type: SIGNUP_SUCCESS
            });

            expect(newState).toEqual(reqState);
        });

        it('Passing wrong email request', () => {
            const error = "User with this email already exists";

            const reqState = {
                "emailError": "User with this email already exists",
                "error": null,
                "usernameError": null
            };
            const newState = signupReducer(undefined, {
                type: SIGNUP_EMAIL_ERROR,
                payload: error
            });
            expect(newState).toEqual(reqState);
        });

        it('Passing wrong username request', () => {
            const error = "User with this username already exists";

            const reqState = {
                "emailError": null,
                "error": null,
                "usernameError": "User with this username already exists"
            };
            const newState = signupReducer(undefined, {
                type: SIGNUP_USERNAME_ERROR,
                payload: error
            });
            expect(newState).toEqual(reqState);
        });

    });

});
