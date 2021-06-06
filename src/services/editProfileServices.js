import { SIGNUP_API } from "../constants";
import axios from "axios";

let url = SIGNUP_API;

export const editProfileService = (pk, user) => {
    let editUrl = url + pk + "/";
    return axios.patch(
        editUrl,
        user,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

export const editPhotoService = (pk, data) => {
    let editUrl = url + pk + "/";
    return axios.patch(
        editUrl,
        data
    )
}
