import Cookies from "universal-cookie";

export const getToken = () => {
    let cookie = new Cookies();
    let token = cookie.get('token')
    return token;
}
