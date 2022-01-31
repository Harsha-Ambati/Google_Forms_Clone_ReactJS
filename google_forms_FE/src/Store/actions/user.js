import { LOGOUT, SET_USER,UNSET_USER } from "./types";

export function setUser(token){
    return{
    type: SET_USER,
    token,
    }
}

export function unsetUser() {
    return{
        type: UNSET_USER,
    }
    
}

export function logout(){
    return{
        type : LOGOUT,
    }
}