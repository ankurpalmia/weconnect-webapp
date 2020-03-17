import { LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_LOGIN_ERROR, GET_USER_DETAILS, AUTH_ERROR, USER_LOGOUT } from "../constants"

const initialState = {
    error: null,
    token: null,
    userDetails: null,
    auth: null
}

export const loginReducer = (state=initialState, action) => {
    switch(action.type){
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
                userDetails: action.payload
            }
        case AUTH_ERROR:
            return {
                ...state,
                userDetails: null
            }
        case USER_LOGOUT:
            return {
                ...state,
                userDetails: false,
                auth: false,
                error: "User Logged out"
            }
        default:
            return state
    }
}
