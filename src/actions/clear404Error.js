import { CLEAR_PAGE_NOT_FOUND } from "../constants"

export const clear404Error = () => dispatch => {
    dispatch({
        type: CLEAR_PAGE_NOT_FOUND
    })
}
