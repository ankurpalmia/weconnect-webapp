import { GET_PROFILE_API, GET_PROFILE_POSTS_API, SEND_REQUEST_API } from "../constants";
import { getToken } from "./getToken";
import axios from 'axios';

const token = getToken();

export const fetchUserProfile = (username) => {
    
    let url = GET_PROFILE_API;
    const tokenConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        params : {
            username : username
        }
    };
    
    return axios.get(
        url,
        tokenConfig
    )
}

export const fetchUserPosts = (username) => {
    let url = GET_PROFILE_POSTS_API;
    const tokenConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        params : {
            username : username
        }
    };
    
    return axios.get(
        url,
        tokenConfig
    )
}

export const fetchMoreProfilePostsService = (page, username) => {
    let url = page;
    const tokenConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        params : {
            username : username
        }
    };
    return axios.get(
        url,
        tokenConfig
    )
}


export const sendRequestService = (username) => {
    let url = SEND_REQUEST_API;
    const tokenConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    };
    const body = {
        username: username
    }
    return axios.post(
        url,
        body,
        tokenConfig
    )
}
