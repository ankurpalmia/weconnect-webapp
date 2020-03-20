import { requestRespondService } from "../services/requestRespondService";
import { RESPONDED, CLEAR_RESPONDED } from "../constants";


export const requestRespond = (accepted, sender, receiver) => dispatch => {
    return requestRespondService(accepted, sender, receiver)
        .then(res => {
            dispatch({
                type: RESPONDED
            })
        })
}

export const clearResponded = () => dispatch => {
    dispatch({
        type: CLEAR_RESPONDED
    })
}
