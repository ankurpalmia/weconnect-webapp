import { getUserDetails } from "../services/getUserDetails"
import { GET_USER_DETAILS, AUTH_ERROR } from "../constants"

export const loadUser = () => dispatch => {
    return getUserDetails()
    .then(res => {
        dispatch({
            type: GET_USER_DETAILS,
            payload: res.data
        })
    })
    .catch(err => {
        if(err.response){
            dispatch({
                type : AUTH_ERROR
            })
        }
    })
}
