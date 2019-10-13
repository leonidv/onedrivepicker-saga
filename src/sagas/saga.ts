import {showPickerAction} from "../redux";
import {rootLoadFileSaga} from "./loadText";
import {all} from "redux-saga/effects"
import {rootSaveFileSaga} from "./saveText";

export function* rootSaga() {
    yield all([
        rootLoadFileSaga(),
        rootSaveFileSaga()
    ])
}
