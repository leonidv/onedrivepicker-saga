import {Err, Ok, Result} from "space-lift";
import {
    OneDriveCommonCallbacks,
    OneDriveOpenProperties,
    OneDriveResponse,
    OneDriveSaveProperties
} from "../onedrivepicker";


export type ShowPickerResult = Result<any | never, OneDriveResponse | never>


/**
 * rewrite all callbacks if present to promise resolve/reject
 * @param options
 */
function asyncShowPicker(options : OneDriveOpenProperties|OneDriveSaveProperties, action: "save"|"open") : Promise<ShowPickerResult> {
    return new Promise<ShowPickerResult>((resolve, reject) => {
        const callbacks : OneDriveCommonCallbacks  = {
            success: response => resolve(Ok(response)),
            cancel: ()=> resolve(Err("cancelled")),
            error: error => reject(Err(error)),
        }

        const odOptions = Object.assign({}, options, callbacks);

        if (action == "open") {
            window.OneDrive.open(odOptions as OneDriveOpenProperties)

        } else {
            window.OneDrive.save(odOptions as OneDriveSaveProperties)
        }
    })
}

export function showPickerForLoading(clientId: string) : Promise<ShowPickerResult> {
    const odOptions : OneDriveOpenProperties = {
        clientId: clientId,
        action: "query",
        advanced: {
            queryParameters: "select=id,name,size,file",
            filter: "folder,files,.txt",
            scopes: "files.readwrite.all"
        }
    }

    return asyncShowPicker(odOptions,"open")
}

export function showPickerForSaving(clientId: string, content : string) : Promise<ShowPickerResult> {
    const dataUri = `data:text/plain;charset=UTF-8,${content}`

    const odOptions : OneDriveSaveProperties = {
        clientId: clientId,
        action: "save",
        sourceUri:dataUri,
        fileName: "unnamed.txt",
        advanced: {
        queryParameters: "select=id,name,size,file",
            filter: "folder,files",
            scopes: "files.readwrite.all"
        },
        progress: function (percent: number) {console.log(`progress: ${percent}`)},
    }

    return asyncShowPicker(odOptions, "save")
}