import { requestRespondService } from "../services/requestRespondService";
import { RESPONDED, CLEAR_RESPONDED, COMMON_ERROR } from "../constants";


export const requestRespond = (accepted, sender, receiver) => dispatch => {
    return requestRespondService(accepted, sender, receiver)
        .then(res => {
            dispatch({
                type: RESPONDED
            })
        })
        .catch(err => {
            dispatch({
                type: COMMON_ERROR,
                payload: err.response
            })
        })
}

export const clearResponded = () => dispatch => {
    dispatch({
        type: CLEAR_RESPONDED
    })
}
