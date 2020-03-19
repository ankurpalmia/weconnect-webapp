import { combineReducers } from "redux";
import { signupReducer } from "./signupReducer";
import { loginReducer } from "./loginReducer";
import { postsReducer } from "./postsReducer";

const AllReducers = combineReducers({
    signup: signupReducer,
    login: loginReducer,
    posts: postsReducer
});

export default AllReducers;
