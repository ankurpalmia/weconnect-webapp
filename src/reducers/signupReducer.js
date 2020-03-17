import { SIGNUP_SUCCESS, CLEAR_SIGNUP_ERROR, SIGNUP_USERNAME_ERROR, SIGNUP_EMAIL_ERROR } from "../constants"

const initialState = {
    emailError: null,
    usernameError: null,
    error: null
}

export const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                error: false
            }
        case SIGNUP_USERNAME_ERROR:
            return {
                ...state,
                usernameError: action.payload
            }
        case SIGNUP_EMAIL_ERROR:
            return {
                ...state,
                emailError: action.payload
            }
        case CLEAR_SIGNUP_ERROR:
            return {
                ...state,
                emailError: null,
                usernameError: null,
                error: null
            }
        default:
            return state
    }
}
