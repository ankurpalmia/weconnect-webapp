import { userLogout } from "../services/userLogout";
import Cookies from "universal-cookie";
import { USER_LOGOUT } from "../constants";

export const logoutAction = () => dispatch => {
    return userLogout()
        .then(res => {
            let cookie = new Cookies();
            cookie.remove('token', { path: "/" });
            dispatch({
                type: USER_LOGOUT,
                payload: res.response
            })
        })
        .catch(err => {
            console.log(err)
        })
}
