import { LOGIN_REQUEST } from "./types";

//We will be asking for username and password initially
const loginRequest = function loginRequest({username,password}){
    return{
        type: LOGIN_REQUEST,
        username,
        password,
    }
}
export default loginRequest