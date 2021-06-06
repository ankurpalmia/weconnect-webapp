import axios from 'axios';
import { SEND_FORGOT_MAIL_API, RESET_PASSWORD_API, FORGOT_PASSWORD_API, USER_API } from '../constants';

export const sendForgotMail = (data) => {
    let url = SEND_FORGOT_MAIL_API;
    return axios.post(
        url,
        data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

export const checkPasswordTokenService = (token) => {
    let url = FORGOT_PASSWORD_API;
    return axios.post(
        url,
        token,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

export const patchPassword = (pk, data) => {
    let url = USER_API + pk + "/reset-password/";
    console.log(pk, data)
    return axios.patch(
        url,
        data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}
