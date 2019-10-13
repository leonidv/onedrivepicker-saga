import {None, Option, Some} from "space-lift";

export interface FileInfo {
    id : string,
    name : string,}


export interface State {
    fileInfo : Option<FileInfo>
    apiEndpoint: Option<string>,
    accessToken : Option<string>
    isLoading: boolean
    content: string
}

export const defaultState: State = {
    fileInfo : None,
    apiEndpoint: None,
    accessToken: None,
    isLoading: false,
    content: ""
}

export const mockState : State = {
    fileInfo : Some({
        id: "123",
        name : "reduxsagatest.txt",
    }),

    apiEndpoint: Some("http://onedrive/"),

    accessToken: Some("abcdefg"),

    isLoading: true,

    content: "some text"
}