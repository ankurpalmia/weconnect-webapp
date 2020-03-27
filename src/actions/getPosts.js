import { getFeedPosts, fetchMorePostsService } from "../services/getFeedPosts";
import { GOT_FEED_POSTS, GET_FRIENDS_LIST, LIST_CHANGED, RESET_LIST_CHANGES, COMMON_ERROR } from "../constants";
import { getFriendsList } from "../services/getFriendsList";
import { createUserPost, editUserPost, deleteUserPost, likeUnlikeService } from "../services/postServices";

export const getFeedPostsAction = () => dispatch => {
    return getFeedPosts()
        .then(res => {
            dispatch({
                type: GOT_FEED_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: COMMON_ERROR,
                payload: err.response
            })
        })
}

export const fetchMorePosts = (page) => dispatch => {
    return fetchMorePostsService(page)
        .then(res => {
            dispatch({
                type: GOT_FEED_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: COMMON_ERROR,
                payload: err.response
            })
        })
}

export const getFriendsAction = () => dispatch => {
    return getFriendsList()
        .then(res => {
            dispatch({
                type: GET_FRIENDS_LIST,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: COMMON_ERROR,
                payload: err.response
            })
        })
}

export const createPost = (formData) => dispatch => {
    return createUserPost(formData)
        .then(res => {
            dispatch({
                type: LIST_CHANGED
            })
        })
        .catch(err => {
            dispatch({
                type: COMMON_ERROR,
                payload: err.response
            })
        })
}

export const editPost = (formData, pk) => dispatch => {
    return editUserPost(formData, pk)
        .then(res => {
            dispatch({
                type: LIST_CHANGED
            })
        })
        .catch(err => {
            dispatch({
                type: COMMON_ERROR,
                payload: err.response
            })
        })
}

export const deletePost = (pk) => dispatch => {
    return deleteUserPost(pk)
        .then(res => {
            dispatch({
                type: LIST_CHANGED
            })
        })
        .catch(err => {
            dispatch({
                type: COMMON_ERROR,
                payload: err.response
            })
        })
}

export const likeUnlikeAction = (pk, data) => dispatch => {
    return likeUnlikeService(pk, data)
        .then(res => {
            dispatch({
                type: LIST_CHANGED
            })
        })
        .catch(err => {
            dispatch({
                type: COMMON_ERROR,
                payload: err.response
            })
        })
}

export const resetListChanged = () => dispatch => {
    dispatch({
        type: RESET_LIST_CHANGES
    })
}
