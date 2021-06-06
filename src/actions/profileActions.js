import { fetchUserProfile, fetchUserPosts, fetchMoreProfilePostsService, sendRequestService } from "../services/profileServices"
import { SAVE_PROFILE, PROFILE_ERROR, CLEAR_PROFILE_ERROR, SAVE_PROFILE_POSTS, REQUEST_SENT, PAGE_NOT_FOUND, COMMON_ERROR } from "../constants";


export const getUserProfile = (username) => dispatch => {
    return fetchUserProfile(username)
        .then(res => {
            dispatch({
                type: SAVE_PROFILE,
                payload: res.data
            })
        })
        .catch(err => {
            if (err.response) {
                if (err.response.status === 404)
                    dispatch({
                        type: PAGE_NOT_FOUND
                    })
                else
                    dispatch({
                        type: PROFILE_ERROR,
                        payload: err.response
                    })
            }
        })
}

export const getUserPosts = (username) => dispatch => {
    return fetchUserPosts(username)
        .then(res => {
            dispatch({
                type: SAVE_PROFILE_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: PROFILE_ERROR,
                    payload: err.response
                })
            }
        })
}

export const fetchMoreProfilePosts = (feedNext, username) => dispatch => {
    return fetchMoreProfilePostsService(feedNext, username)
        .then(res => {
            dispatch({
                type: SAVE_PROFILE_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: PROFILE_ERROR,
                    payload: err.response
                })
            }
        })
}

export const sendRequestAction = (username) => dispatch => {
    return sendRequestService(username)
        .then(res => {
            dispatch({
                type: REQUEST_SENT
            })
        })
        .catch(err => {
            dispatch({
                type: COMMON_ERROR,
                payload: err.response
            })
        })
}

export const clearProfileError = () => dispatch => {
    dispatch({
        type: CLEAR_PROFILE_ERROR
    })
}
