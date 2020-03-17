export const SIGNUP = `/signup`;
export const LOGIN = `/login`;
export const SIGNUP_SUCCESS_PAGE = `/signup-success`;
export const FEED_PAGE = `/feed`;

const BASE_URL = `http://localhost:8000/`;
export const SIGNUP_API = `${BASE_URL}user/signup/`;
export const LOGIN_API = `${BASE_URL}user/login/`;
export const LOGOUT_API = `${BASE_URL}user/logout/`;
export const GET_USER_API = `${BASE_URL}user/getuser/`;

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_EMAIL_ERROR = 'SIGNUP_EMAIL_ERROR';
export const SIGNUP_USERNAME_ERROR = 'SIGNUP_USERNAME_ERROR';
export const CLEAR_SIGNUP_ERROR = 'CLEAR_SIGNUP_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR';
export const GET_USER_DETAILS = 'GET_USER_DETAILS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const USER_LOGOUT = 'USER_LOGOUT';
