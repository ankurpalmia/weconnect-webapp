import { GET_FRIENDS_API } from "../constants";
import axios from "axios";
import { getToken } from "./getToken";

let url = GET_FRIENDS_API;

export const getFriendsList = () => {
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
