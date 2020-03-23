import { EDIT_PROFILE_SUCCESS, EDIT_PROFILE_EMAIL_ERROR, EDIT_PROFILE_USERNAME_ERROR, CLEAR_EDIT_PROFILE_ERROR } from "../constants"

const initialState = {
    emailError: null,
    usernameError: null,
    error: null
}

export const editProfile = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_PROFILE_SUCCESS:
            return {
                ...state,
                error: false
            }
        case EDIT_PROFILE_EMAIL_ERROR:
            return {
                ...state,
                emailError: action.payload
            }
        case EDIT_PROFILE_USERNAME_ERROR:
            return {
                ...state,
                usernameError: action.payload
            }
        case CLEAR_EDIT_PROFILE_ERROR:
            return {
                ...state,
                error: null,
                usernameError: null,
                emailError: null
            }
        default:
            return state
    }
}
