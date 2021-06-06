import { PAGE_NOT_FOUND, CLEAR_PAGE_NOT_FOUND } from "../constants";

const initialState= {
    pageNotFound: null
}

export const noPage = (state=initialState, action) => {
    switch (action.type) {
        case PAGE_NOT_FOUND:
            return {
                ...state,
                pageNotFound: true
            }
        case CLEAR_PAGE_NOT_FOUND:
            return {
                ...state,
                pageNotFound: null
            }
        default:
            return state;
    }
}
