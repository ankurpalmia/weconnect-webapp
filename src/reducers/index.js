import { combineReducers } from "redux";
import { signupReducer } from "./signupReducer";
import { loginReducer } from "./loginReducer";

const AllReducers = combineReducers({
    signup: signupReducer,
    login: loginReducer
});

export default AllReducers;
