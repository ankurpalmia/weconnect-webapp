import { RESPONDED, CLEAR_RESPONDED, REQUEST_SENT } from "../constants"

const initialState = {
    respond: null,
    requestSent: null
}

export const friendRequest = (state=initialState, action) => {
    switch(action.type) {
        case REQUEST_SENT:
            return {
                ...state,
                requestSent: true
            }
        case RESPONDED:
            return {
                ...state,
                respond: true
            }
        case CLEAR_RESPONDED:
            return {
                ...state,
                respond: null,
                requestSent: null
            }
        default:
            return state
    }
}
