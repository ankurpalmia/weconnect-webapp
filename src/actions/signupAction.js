import { signupPost } from "../services/signupPost";
import { SIGNUP_SUCCESS, SIGNUP_EMAIL_ERROR, SIGNUP_USERNAME_ERROR, CLEAR_SIGNUP_ERROR } from "../constants";

export const signupAction = (user) => dispatch => {
    return signupPost(user)
    .then(res => {
        console.log("in signup aciton success", res)
        dispatch({
            type: SIGNUP_SUCCESS,
        })
    })
    .catch(err => {
        console.log("in signup error", err.response)
        if(err.response.data.email){
            dispatch({
                type: SIGNUP_EMAIL_ERROR,
                payload: err.response.data.email
            })
        }
        else if(err.response.data.username){
            dispatch({
                type: SIGNUP_USERNAME_ERROR,
                payload: err.response.data.username
            })
        }
    })
} 

export const clearSignupError = () => dispatch => {
    dispatch({
        type: CLEAR_SIGNUP_ERROR
    })
}
