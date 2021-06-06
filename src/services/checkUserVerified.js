import { USER_POST_API } from "../constants";
import axios from 'axios';
import { getToken } from "./getToken";

let url = USER_POST_API;

export const checkUserVerified = () => {
    const token = getToken();
    const tokenConfig = {
        headers :{
            'Content-Type' : 'application/json',
            'Authorization' : `Token ${token}`
        }
    }
    return axios.head(
        url,
        tokenConfig
    )
}
