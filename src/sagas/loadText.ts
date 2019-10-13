import {call, put, takeEvery} from "redux-saga/effects"
import {
    loaderHideAction,
    loaderShowAction,
    saveAccessTokenAction,
    saveFileInformationAction, SaveFileInformationPayload,
    showPickerAction, updateContentAction,
} from "../redux";
import {Action} from "redux-actions";
import {DriveItem} from "@microsoft/microsoft-graph-types";
import {showPickerForLoading, ShowPickerResult} from "./onedrivesaga";


export function loadTextFile(accessToken : string, apiEndpoint : string, item : DriveItem) : Promise<Response> {
    /**
     * {
            {
              "webUrl": null,
              "value": [
                {
                  "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#drives('A450CDA6820B7D71')/items/$entity",
                  "id": "A450CDA6820B7D71!123975",
                  "name": "onedrivesaga.txt",
                  "size": 4,
                  "file": {
                    "mimeType": "text/plain",
                    "hashes": {
                      "quickXorHash": "VCjDHOgAAAAAAAAABAAAAAAAAAA=",
                      "sha1Hash": "640AB2BAE07BEDC4C163F679A746F7AB7FB5D1FA"
                    }
                  }
                }
              ],
              "accessToken": "Ew...7N7nAI=",
              "apiEndpoint": "https://graph.microsoft.com/v1.0/"
            }
     */
    // https://graph.microsoft.com/v1.0/drive/items/A450CDA6820B7D71!120015
    return fetch(`${apiEndpoint}/drive/items/${item.id}/content`, {
        method: "GET",
        cache: "no-cache",
        headers: {
            "Authorization": `bearer ${accessToken}`
        },
        redirect: "follow"
    })
}


export function* loadTextFileSaga(action: Action<string>) {
    try {
        yield put(loaderShowAction())
        const item = yield call(showPickerForLoading, action.payload as string)
        if (item.isOk()) {
            const oneDriveResponse = item.get()

            console.log("oneDriveResponse",oneDriveResponse)

            const {accessToken, apiEndpoint} = oneDriveResponse
            yield put(saveAccessTokenAction({accessToken, apiEndpoint}))

            const file: DriveItem = oneDriveResponse.value[0]
            const response = (yield call(loadTextFile, accessToken, apiEndpoint, file)) as Response
            const fileContent = yield response.text()
            const saveFileInfoPayload : SaveFileInformationPayload = {
                id : file.id as string,
                name: file.name as string
            }
            yield put(saveFileInformationAction(saveFileInfoPayload))
            yield put(updateContentAction(fileContent))
        } else {
            console.log("sage: cancelled")
        }
    } finally {
        yield put(loaderHideAction())
    }

}

export function* rootLoadFileSaga() {
    yield takeEvery(showPickerAction, loadTextFileSaga)
}