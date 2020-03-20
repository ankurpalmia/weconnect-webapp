import { combineReducers } from "redux";
import { signupReducer } from "./signupReducer";
import { loginReducer } from "./loginReducer";
import { postsReducer } from "./postsReducer";
import { userProfile } from "./userProfile";
import { friendRequest } from "./friendRequest";
import { emailVerify } from './emailVerify';

const AllReducers = combineReducers({
    signup: signupReducer,
    login: loginReducer,
    posts: postsReducer,
    profile: userProfile,
    friend: friendRequest,
    emailVerify: emailVerify
});

export default AllReducers;
