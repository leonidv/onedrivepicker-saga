import {put, select, takeEvery} from "redux-saga/effects"
import {
    loaderHideAction,
    loaderShowAction,
    saveAccessTokenAction,
    saveFileInformationAction,
    SaveFileInformationPayload,
    uploadFileAction
} from "../redux";
import {State} from "../state";
import {showPickerForSaving, ShowPickerResult} from "./onedrivesaga";
import {Action} from "redux-actions";
import {DriveItem} from "@microsoft/microsoft-graph-types";

function saveFileContent(accessToken: string, apiEndpoint: string, fileId: string, content: string) {

    const formData = new FormData()
    formData.append("data", new Blob([content]))

    return fetch(`${apiEndpoint}drive/items/${fileId}/content`, {
        method: "PUT",
        headers: {
            "Authorization": `bearer ${accessToken}`,
            "Content-Type": "text/plain"
        },

        redirect: "follow",
        body: content
    })
}

function* saveFileSaga(action: Action<string>) {
    try {
        yield put(loaderShowAction())
        const state: State = yield select(state => state)

        if (state.fileInfo.isDefined()) {
            console.log("update file content")
            yield  saveFileContent(
                state.accessToken.get() as string,
                state.apiEndpoint.get() as string,
                state.fileInfo.get().id,
                state.content)
            console.log("saved")
        } else {
            console.log("save new file")
            const pickerResult: ShowPickerResult = yield showPickerForSaving(action.payload, state.content)
            if (pickerResult.isOk()) {
                const odResponse = pickerResult.get()
                const {accessToken, apiEndpoint} = odResponse
                yield put(saveAccessTokenAction({accessToken,apiEndpoint}))

                const file: DriveItem = odResponse.value[0]
                const saveFileInfoPayload : SaveFileInformationPayload = {
                    id : file.id as string,
                    name: file.name as string
                }
                yield put(saveFileInformationAction(saveFileInfoPayload))
            } else {
                console.log("saga: saving is cancelled")
            }
        }
    } finally {
        yield put(loaderHideAction())
    }

}

export function* rootSaveFileSaga() {
    yield takeEvery(uploadFileAction, saveFileSaga)
}