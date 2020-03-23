import { sendForgotMail, checkPasswordTokenService, patchPassword } from "../services/forgotPassword"
import { MAIL_SENT, MAIL_ERROR, CLEAR_MAIL_ERROR, CORRECT_TOKEN, PASSWORD_RESET_SUCCESS } from "../constants"

export const sendForgotMailAction = (data) => dispatch => {
    return sendForgotMail(data)
        .then(res => {
            dispatch({
                type: MAIL_SENT
            })
        })
        .catch(err => {
            if (err.response) {
                if (err.response.status === 404)
                    dispatch({
                        type: MAIL_ERROR,
                        payload: "Username not found"
                    })
                else
                    dispatch({
                        type: MAIL_ERROR,
                        payload: err.response.data
                    })
            }
        })
}

export const checkPasswordToken = (token) => dispatch => {
    return checkPasswordTokenService(token)
        .then(res => {
            dispatch({
                type: CORRECT_TOKEN,
                payload: res.data
            })
        })
        .catch(err => {
            if (err.response) {
                if (err.response.status === 404)
                    dispatch({
                        type: MAIL_ERROR,
                        payload: "Invalid Token"
                    })
                else
                    dispatch({
                        type: MAIL_ERROR,
                        payload: err.response.data
                    })
            }
        })
}

export const resetPassword = (data) => dispatch => {
    return patchPassword(data)
        .then(res=>{
            dispatch({
                type: PASSWORD_RESET_SUCCESS
            })
        })
        .catch(err=>{
            console.log(err.response)
        })
}

export const clearMailError = () => dispatch => {
    dispatch({
        type: CLEAR_MAIL_ERROR
    })
}
