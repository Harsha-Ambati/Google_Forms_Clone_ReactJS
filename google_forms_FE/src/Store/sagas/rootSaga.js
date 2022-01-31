import signupWatcher from "./signup";
import loginWatcher from "./login";
import { all } from "redux-saga/effects";
import questionWatcher from "./questions";

export default function* rootSaga(){
    yield all([
        signupWatcher(),
        loginWatcher(),
        questionWatcher(),
    ])
}
