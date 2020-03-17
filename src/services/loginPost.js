import axios from "axios";
import { LOGIN_API } from "../constants";

let url = LOGIN_API;
export const loginPost = (user) => {
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
