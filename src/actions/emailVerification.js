import { verifyEmailService } from "../services/signupPost"
import { VERIFY_EMAIL, VERIFY_EMAIL_ERROR, CLEAR_VERIFY_ERROR } from "../constants"

export const emailVerification = (token) => dispatch => {
    return verifyEmailService(token)
    .then(res=>{
        dispatch({
            type: VERIFY_EMAIL,
            payload: res.data
        })
    })
    .catch(err=>{
        if(err.response.status === 404) {
            dispatch({
                type: VERIFY_EMAIL_ERROR,
                payload: "Invalid Token"
            })
        }
        else if(err.response) {
            dispatch({
                type: VERIFY_EMAIL_ERROR,
                payload: err.response.data
            })
        }
    })
}

export const clearEmailError = () => dispatch => {
    dispatch({
        type: CLEAR_VERIFY_ERROR
    })
}
