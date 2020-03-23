import axios from 'axios';
import { SEND_FORGOT_MAIL_API, RESET_PASSWORD_API, FORGOT_PASSWORD_API } from '../constants';

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

export const patchPassword = (data) => {
    let url = RESET_PASSWORD_API;
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
