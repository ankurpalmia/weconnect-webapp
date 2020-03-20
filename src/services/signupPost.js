import axios from "axios";
import { SIGNUP_API, VERIFY_EMAIL_API } from "../constants";

export const signupPost = (user) => {
    let url = SIGNUP_API;
    return axios.post(
        url,
        user,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

export const verifyEmailService = (token) => {
    let url = VERIFY_EMAIL_API;
    return axios.post(
        url,
        {
            token: token
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}
