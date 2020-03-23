import { combineReducers } from "redux";
import { signupReducer } from "./signupReducer";
import { loginReducer } from "./loginReducer";
import { postsReducer } from "./postsReducer";
import { userProfile } from "./userProfile";
import { friendRequest } from "./friendRequest";
import { emailVerify } from './emailVerify';
import { editProfile } from './editProfile';
import { noPage } from "./noPage";

const AllReducers = combineReducers({
    signup: signupReducer,
    login: loginReducer,
    posts: postsReducer,
    profile: userProfile,
    friend: friendRequest,
    emailVerify: emailVerify,
    editProfile: editProfile,
    noPage: noPage
});

export default AllReducers;
