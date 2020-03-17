import { loginPost } from "../services/loginPost";
import { LOGIN_SUCCESS, CLEAR_LOGIN_ERROR, LOGIN_FAIL } from "../constants";
import Cookies from "universal-cookie";

export const loginAction = (user) => dispatch => {
    return loginPost(user)
        .then(res => {
            let cookie = new Cookies();
            cookie.set('token', res.data.token, {
                path: "/"
            })
            console.log("dispatching user", res.data.token)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.token
            })
        })
        .catch(err => {
            if (err.response)
                if (err.response.data.non_field_errors)
                    dispatch({
                        type: LOGIN_FAIL,
                        payload: err.response.data.non_field_errors
                    })
        })
}

export const clearLoginError = () => dispatch => {
    dispatch({
        type: CLEAR_LOGIN_ERROR
    })
}
