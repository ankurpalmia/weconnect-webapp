import { editProfileService, editPhotoService } from "../services/editProfileServices"
import { EDIT_PROFILE_SUCCESS } from "../constants"

export const editProfile = (pk, user) => dispatch => {
    return editProfileService(pk, user)
        .then(res => {
            dispatch({
                type: EDIT_PROFILE_SUCCESS
            })
        })
        .catch(err => {
            if (err.response) {
                console.log(err.response)
            }
        })
}

export const editImageAction = (pk, data) => dispatch => {
    return editPhotoService(pk, data)
        .then(res => {
            dispatch({
                type: EDIT_PROFILE_SUCCESS
            })
        })
        .catch(err => {
            if (err.response) {
                console.log(err.response)
            }
        })
}
