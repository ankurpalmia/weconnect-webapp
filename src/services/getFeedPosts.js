import { GET_FEED_POSTS_API } from "../constants";
import { getToken } from "./getToken";
import axios from 'axios';

let url = GET_FEED_POSTS_API;
const token = getToken();
const tokenConfig = {
    headers :{
        'Content-Type' : 'application/json',
        'Authorization' : `Token ${token}`
    }
}

export const getFeedPosts = () => {
    return axios.get(
        url,
        tokenConfig
    )
}

export const fetchMorePostsService = (page) => {
    url = page;
    return axios.get(
        url,
        tokenConfig
    )
}
