import { LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_LOGIN_ERROR, GET_USER_DETAILS, AUTH_ERROR, USER_LOGOUT, MAIL_SENT, CLEAR_MAIL_ERROR, MAIL_ERROR, PASSWORD_RESET_SUCCESS, CORRECT_TOKEN } from "../constants"

const initialState = {
    error: null,
    token: null,
    userDetails: null,
    auth: null,
    mailSent: null,
    mailError: null,
    userPk: null,
    resetPass: null
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload,
                auth: true,
                error: false
            }
        case LOGIN_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_LOGIN_ERROR:
            return {
                ...state,
                error: null
            }
        case GET_USER_DETAILS:
            return {
                ...state,
                userDetails: action.payload,
                auth: true
            }
        case AUTH_ERROR:
            return {
                ...state,
                userDetails: null,
                auth: false
            }
        case USER_LOGOUT:
            return {
                ...state,
                userDetails: false,
                auth: false,
                error: "User Logged out"
            }
        case MAIL_SENT:
            return {
                ...state,
                mailSent: true
            }
        case MAIL_ERROR:
            return {
                ...state,
                mailError: action.payload
            }
        case CLEAR_MAIL_ERROR:
            return {
                ...state,
                mailError: null
            }
        case CORRECT_TOKEN:
            return {
                ...state,
                userPk: action.payload
            }
        case PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                resetPass: true,
                error: "Password changed"
            }
        default:
            return state
    }
}
