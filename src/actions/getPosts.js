import { getFeedPosts, fetchMorePostsService } from "../services/getFeedPosts";
import { GOT_FEED_POSTS, GET_FRIENDS_LIST, LIST_CHANGED, RESET_LIST_CHANGES } from "../constants";
import { getFriendsList } from "../services/getFriendsList";
import { createUserPost, editUserPost, deleteUserPost, likeUnlikeService } from "../services/postServices";

export const getFeedPostsAction = () => dispatch => {
    return getFeedPosts()
        .then(res => {
            console.log("res.data", res.data);
            dispatch({
                type: GOT_FEED_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err.reponse)
        })
}

export const fetchMorePosts = (page) => dispatch => {
    return fetchMorePostsService(page)
        .then(res => {
            console.log("fetching success", res.data);
            dispatch({
                type: GOT_FEED_POSTS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err.reponse)
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
            console.log(err.response)
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
            console.log(err.reponse)
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
            console.log(err.reponse)
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
            console.log(err.reponse)
        })
}

export const likeUnlikeAction = (data) => dispatch => {
    return likeUnlikeService(data)
        .then(res => {
            dispatch({
                type: LIST_CHANGED
            })
        })
        .catch(err => {
            console.log(err.reponse)
        })
}

export const resetListChanged = () => dispatch => {
    dispatch({
        type: RESET_LIST_CHANGES
    })
}
