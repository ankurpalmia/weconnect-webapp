import { LOGOUT_API } from "../constants"
import { getToken } from "./getToken";
import axios from "axios";

let url = LOGOUT_API;

export const userLogout = () => {
    let token = getToken();
    const tokenConfig = {
        headers :{
            'Authorization' : `Token ${token}`
        }
    }
    return axios.delete(
        url,
        tokenConfig
    )
}
