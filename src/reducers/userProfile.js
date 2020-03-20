import { SAVE_PROFILE, PROFILE_ERROR, CLEAR_PROFILE_ERROR, SAVE_PROFILE_POSTS, REQUEST_SENT } from "../constants"

const initialState = {
    userDetails: null,
    error: null,
    postList: [],
    postNext: null,
    postPrev: null,
    postCount: null,
    postError: null
}

export const userProfile = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_PROFILE:
            return {
                ...state,
                userDetails: action.payload
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case SAVE_PROFILE_POSTS:
            if (action.payload.previous === null)
                return {
                    ...state,
                    postList: action.payload.results,
                    postNext: action.payload.next,
                    postPrev: action.payload.previous,
                    postCount: action.payload.count,
                    error: false
                }
            else {
                return {
                    ...state,
                    postList: state.postList.concat(action.payload.results),
                    postNext: action.payload.next,
                    postPrev: action.payload.previous,
                    postCount: action.payload.count,
                    error: false
                }
            }
        case CLEAR_PROFILE_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
