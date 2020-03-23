import { USER_POST_API, LIKE_UNLIKE_API } from "../constants";
import { getToken } from "./getToken";
import axios from "axios";

let url = USER_POST_API;
const token = getToken();
const tokenConfig = {
    headers :{
        'Content-Type' : 'application/json',
        'Authorization' : `Token ${token}`
    }
}

export const createUserPost = (formData) => {
    return axios.post(
        url,
        formData,
        tokenConfig
    )
}

export const editUserPost = (formData, pk) => {
    let patchUrl = url+ pk + "/";
    return axios.patch(
        patchUrl,
        formData,
        tokenConfig
    )
}

export const deleteUserPost = (pk) => {
    let deleteUrl = url + pk + "/";
    return axios.delete(
        deleteUrl,
        tokenConfig
    )
}

export const likeUnlikeService = (data) => {
    url = LIKE_UNLIKE_API;
    return axios.post(
        url,
        data,
        tokenConfig
    )
}
