import { GET_USER_API } from "../constants";
import { getToken } from "./getToken";
import axios from "axios";

let url = GET_USER_API;

export const getUserDetails = () => {
    const token = getToken();
    const tokenConfig = {
        headers :{
            'Content-Type' : 'application/json',
            'Authorization' : `Token ${token}`
        }
    }
    return axios.get(
        url,
        tokenConfig
    )
}
