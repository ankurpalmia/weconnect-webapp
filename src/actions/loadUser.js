import { getUserDetails } from "../services/getUserDetails";
import { checkUserVerified } from "../services/checkUserVerified";
import { GET_USER_DETAILS, AUTH_ERROR, SET_USER_VERIFIED, CLEAR_VERIFIED_ERROR } from "../constants";

export const loadUser = () => dispatch => {
    return getUserDetails()
        .then(res => {
            console.log(res)
            dispatch({
                type: GET_USER_DETAILS,
                payload: res.data
            })
        })
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: AUTH_ERROR
                })
            }
        })
}

export const checkVerified = () => dispatch => {
    return checkUserVerified()
        .then(res => {
            console.log(res)
            dispatch({
                type: SET_USER_VERIFIED,
                payload: true
            })
        })
        .catch(err => {
            dispatch({
                type: SET_USER_VERIFIED,
                payload: false
            })
        })
}

export const clearVerifiedError = () => dispatch => {
    dispatch({
        type: CLEAR_VERIFIED_ERROR
    })
}
