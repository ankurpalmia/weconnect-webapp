import axios from "axios";
import { SIGNUP_API } from "../constants";

let url = SIGNUP_API;
export const signupPost = (user) => {
    console.log("in signup serviece", user, url)
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
