import { VERIFY_EMAIL, VERIFY_EMAIL_ERROR, CLEAR_VERIFY_ERROR } from "../constants"

const intialState = {
    verified: null,
    error: null
}

export const emailVerify = (state = intialState, action) => {
    switch (action.type) {
        case VERIFY_EMAIL:
            return {
                ...state,
                verified: action.payload
            }
        case VERIFY_EMAIL_ERROR:
            return {
                ...state,
                verified: null,
                error: action.payload
            }
        case CLEAR_VERIFY_ERROR:
            return {
                ...state,
                verified: null,
                error: null
            }
        default:
            return state
    }
}
