import { GOT_FEED_POSTS, SET_USER_VERIFIED, CLEAR_VERIFIED_ERROR, GET_FRIENDS_LIST, POST_CREATED, LIST_CHANGED, RESET_LIST_CHANGES } from "../constants"

const initialState = {
    feedPosts: [],
    feedNext: null,
    feedPrev: null,
    feedCount: null,
    error: null,
    profilePosts: null,
    userVerified: null,
    myFriends: [],
    listChanged: null
}

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GOT_FEED_POSTS:
            if (action.payload.previous === null)
                return {
                ...state,
                feedPosts: action.payload.results,
                feedNext: action.payload.next,
                feedPrev: action.payload.previous,
                feedCount: action.payload.count,
                error: false
            }
            else{
                console.log("before saving", state.feedPosts)
            return {
                ...state,
                feedPosts: state.feedPosts.concat(action.payload.results),
                feedNext: action.payload.next,
                feedPrev: action.payload.previous,
                feedCount: action.payload.count,
                error: false
            }
        }
        case SET_USER_VERIFIED:
            return {
                ...state,
                userVerified: action.payload
            }
        case CLEAR_VERIFIED_ERROR:
            return {
                ...state,
                userVerified: null
            }
        case GET_FRIENDS_LIST:
            return {
                ...state,
                myFriends: action.payload
            }
        case LIST_CHANGED:
            return {
                ...state,
                listChanged: true
            }
        case RESET_LIST_CHANGES:
            return {
                ...state,
                listChanged: null
            }
        default:
            return state;
    }
}
