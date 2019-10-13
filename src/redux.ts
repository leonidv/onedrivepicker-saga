import {Action, createAction} from "redux-actions";
import {FileInfo, State} from "./state";
import {Some} from "space-lift";


const LOADING_START = "LOADING/SHOW_PICKER";

const LOADING_SHOW_FILE = "LOADING/SHOW_FILE";

const SAVE_ACCESS_TOKEN = "SAVE_ACCESS_TOKEN";
const SAVE_FILE_INFORMATION = "SAVE_FILE_INFO"

const LOADER_SHOW = "LOADER/SHOW";
const LOADER_HIDE = "LOADER/HIDE";

const CONTENT_CHANGED = "CONTENT/CHANGE_";
const CONTENT_UPDATE = "CONTENT/UPDATE";

const UPLOAD_FILE = "UPLOAD/START";

export const showPickerAction = createAction<string>(LOADING_START);

export const loaderShowAction = createAction(LOADER_SHOW);
export const loaderHideAction = createAction(LOADER_HIDE);


export interface SaveFileInformationPayload {
    id : string,
    name: string,
}

export const saveFileInformationAction = createAction<SaveFileInformationPayload>(SAVE_FILE_INFORMATION)

export interface SaveAccessTokenPayload {
    accessToken : string,
    apiEndpoint : string
}
export const saveAccessTokenAction = createAction<SaveAccessTokenPayload>(SAVE_ACCESS_TOKEN);

export const changeContentAction = createAction<string>(CONTENT_CHANGED);
export const updateContentAction = createAction<string>(CONTENT_UPDATE);


export const uploadFileAction = createAction<string>(UPLOAD_FILE);

function loaderShow(state: State, action: Action<void>) : State {
    return {...state, isLoading: true}
}

function loaderHide(state: State, action: Action<void>) : State {
    return {...state, isLoading: false}
}

function saveAccessToken(state: State, action: Action<SaveAccessTokenPayload>) : State {
    const {accessToken, apiEndpoint} = action.payload
    return {...state, accessToken: Some(accessToken), apiEndpoint: Some(apiEndpoint)}
}

function saveFileInformation(state : State, action : Action<SaveFileInformationPayload>) : State {
    const {id, name} = action.payload
    return {...state, fileInfo: Some({id, name})}
}

function updateContent(state : State, action: Action<string>): State {
    return {...state, content: action.payload}
}

export const actionHandlers = {
    [LOADER_SHOW]: loaderShow,
    [LOADER_HIDE]: loaderHide,
    [SAVE_ACCESS_TOKEN]: saveAccessToken,
    [SAVE_FILE_INFORMATION]: saveFileInformation,
    [CONTENT_UPDATE]: updateContent
}


